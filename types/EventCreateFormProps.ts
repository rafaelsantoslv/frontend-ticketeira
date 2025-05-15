type EventCreationFormProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => void
    initialData?: any // Adicionado para suportar edição
}