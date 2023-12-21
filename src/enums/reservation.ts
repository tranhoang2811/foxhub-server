export enum EReservationPaymentStatus {
  PENDING = 'pending',
  RENTER_PAID = 'renter-paid',
  RETURN_TO_RENTER = 'return-to-renter',
  PAYOUT = 'payout',
  COMPLETE = 'complete',
  CANCEL = 'cancel',
}

export enum EPaymentMethod {
  VNPAY = 'vnpay',
  MOMO = 'momo',
  VISA = 'visa',
}
