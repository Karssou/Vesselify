export interface APIResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}
