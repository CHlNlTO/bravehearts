export interface BraveCardInterface {
  id: bigint;
  name: string;
  handle: string;
  brave: string;
}

export interface AddBraveFormProps {
  onSuccess: () => void; // New prop to trigger data refetch
}
