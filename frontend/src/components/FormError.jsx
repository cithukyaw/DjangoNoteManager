export const FormError = ({ errors, field }) => {
    if (errors.hasOwnProperty(field)) {
        return (
            <span className="form-error">
                { Array.isArray(errors) ? errors[field].join('<br>') : errors[field] }
            </span>
        );
    } else {
        return <></>
    }
};
