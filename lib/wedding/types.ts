export enum WeddingSide {
  BRIDE = 'bride',
  GROOM = 'groom',
  BOTH = 'both',
}

export enum GuestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface Guest {
  _id: string;
  fullName: string;
  phoneNumber: string;
  side: WeddingSide;
  hasKids: boolean;
  status: GuestStatus;
  qrToken: string;
  checkedIn: boolean;
  checkedInAt: string | null;
  cardGenerated: boolean;
  cardGeneratedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGuestInput {
  fullName: string;
  phoneNumber: string;
  side: WeddingSide;
  hasKids: boolean;
}

export interface CheckInResult {
  alreadyCheckedIn: boolean;
  guest: {
    fullName: string;
    side: WeddingSide;
    hasKids: boolean;
    checkedInAt: string | null;
  };
}
