import {BindingScope, injectable} from '@loopback/core';
import {Request, Response} from '@loopback/rest';
import {initializeApp} from 'firebase/app';
import {
  FirebaseStorage,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage';
import {lookup} from 'mime-types';
import multer from 'multer';
import {uuid} from 'uuidv4';
import {
  FIREBASE_CONFIG,
  FIREBASE_PROPERTY_IMAGE_FOLDER,
} from '../config/firebase';
import {DEFAULT_CONTENT_TYPE} from '../constants/file';
import {getValidArray} from '../utils/common';

@injectable({scope: BindingScope.SINGLETON})
export class FileService {
  private storage: FirebaseStorage;

  constructor() {
    const app = initializeApp(FIREBASE_CONFIG);
    this.storage = getStorage(app);
  }

  async uploadFileToFirebase(
    fileName: string,
    file: Express.Multer.File,
  ): Promise<void> {
    const mineType: string | false = lookup(file.originalname);
    const contentType: string = mineType || DEFAULT_CONTENT_TYPE;
    const fileDestination: string = `${FIREBASE_PROPERTY_IMAGE_FOLDER}/${fileName}`;
    const storageReference: StorageReference = ref(
      this.storage,
      fileDestination,
    );
    const metadata = {
      contentType,
    };
    uploadBytes(storageReference, file.buffer, metadata).then(snapshot => {
      console.log('Uploaded a blob or file!', snapshot);
    });
  }

  async uploadSingle(request: Request, response: Response): Promise<void> {
    const upload = multer().single('file');
    upload(request, response, () => {
      const {file} = request;
      if (file) {
        const fileName: string = uuid();
        this.uploadFileToFirebase(fileName, file);
      }
    });
  }

  async uploadMultiple(request: Request, response: Response): Promise<void> {
    const upload = multer().array('files');
    upload(request, response, () => {
      const {files} = request;
      Promise.all(
        getValidArray(files as Express.Multer.File[]).map(file => {
          if (file) {
            const fileName: string = uuid();
            this.uploadFileToFirebase(fileName, file);
          }
        }),
      );
    });
  }
}
