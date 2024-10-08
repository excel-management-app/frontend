import MyForm from "../Form";

interface AddRowDialogProps {
  onClose: () => void;
  fileId: string;
  sheetName: string;
  refetch: () => void;
}

export default function AddRowDialog({
  onClose,
  fileId,
  sheetName,
  refetch,
}: AddRowDialogProps) {
  return (
    <MyForm
      fileId={fileId}
      onClose={onClose}
      sheetName={sheetName}
      refetch={refetch}
    />
  );
}
