export type Role = "CANDIDATE" | "EMPLOYER_ADMIN" | "RECRUITER" | "PLATFORM_ADMIN";

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface CompanyResponse {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  website?: string | null;
  industry?: string | null;
  companySize?: string | null;
  location?: string | null;
  verificationStatus: VerificationStatus;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: Role;
  phone?: string | null;
  banned: boolean;
  company?: CompanyResponse | null;
  createdAt?: string | null;
}

export interface AuthResponse {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserResponse;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  timestamp: string;
}

export interface ValidationErrorItem {
  field: string;
  rejectedValue?: unknown;
  message: string;
}

export interface ErrorResponse {
  success: false;
  statusCode: number;
  errorCode: string;
  message: string;
  path: string;
  timestamp: string;
  errors?: ValidationErrorItem[];
}
