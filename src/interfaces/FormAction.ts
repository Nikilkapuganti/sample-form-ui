export interface FormAction{
    onResult: (result: any) => void;
    onError?: (error: string) => void;
}