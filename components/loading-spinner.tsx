// components/common/LoadingSpinner.tsx
export function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#400041] border-t-transparent" />
        </div>
    );
}