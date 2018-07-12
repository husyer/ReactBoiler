import { withFormsy } from 'formsy-react';
import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField';
import { addValidationRule } from 'formsy-react';

addValidationRule('isWhiteSpace', function (values, value) {
    if (value && value.trim() == '') {
        return false;
    }
    return true;
});

class MyInput extends React.Component {


    changeValue = (event) => {
        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        // Important: Don't skip this step. This pattern is required
        // for Formsy to work.
        this.props.setValue(event.currentTarget.value);
        this.props.handleChange(event)
    }

    render() {
        // An error message is returned only if the component is invalid
        const errorMessage = this.props.getErrorMessage();

        return (
            <div>
                <TextField
                    autoFocus={this.props.autoFocus}
                    margin="dense"
                    id={this.props.TextFieldId}
                    label={this.props.TextFieldLabel}
                    type={this.props.type}
                    onChange={this.changeValue}
                    value={this.props.value}
                    fullWidth
                    required
                    multiline={this.props.multiline}
                />
                <FormHelperText style={{ color: 'red' }} id="name-error-text">{errorMessage}</FormHelperText>

            </div>
        );
    }
}

export default withFormsy(MyInput);