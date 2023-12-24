export interface HashPasswordService<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
}
