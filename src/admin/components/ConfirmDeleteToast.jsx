// components/ConfirmDeleteToast.jsx
const ConfirmDeleteToast = ({ onConfirm, onCancel }) => {
    return (
        <div>
            <p >
                Are you sure you want to delete this recipe?
            </p>
            <div className="flex justify-end gap-2">
                <button
                    onClick={onCancel}
                    className="w-20 h-10 border rounded bg-black text-white text-sm"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="w-20 h-10 border rounded text-sm"
                >
                    Yes
                </button>
            </div>
        </div>
    )
}

export default ConfirmDeleteToast
