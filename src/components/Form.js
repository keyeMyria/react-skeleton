import React, {Component} from 'react';
import {Form, Select as SemanticSelect, Checkbox as SemanticCheckbox} from 'semantic-ui-react';
import {injectIntl} from 'react-intl';

export default props => (
    <Form {...props}/>
);

export const FormField = props => (
    <Form.Field {...props}/>
);

export const Input = injectIntl(props => (
    <Form.Input
        {...props}
        placeholder={props.intl.formatMessage({id: props.placeholderid})}
        onChange={e => props.onChange(e.target.name, e.target.value)}
    />
));

export const FormGroup = props => (
    <Form.Group {...props}/>
);

class SelectComponent extends Component {
    render() {
        let {options, intl, placeholderid, onChange} = this.props;
        options.forEach(option => {
            option.text = intl.formatMessage({id: option.key})
        });
        return (
            <SemanticSelect
                options={options}
                placeholder={intl.formatMessage({id: placeholderid})}
                onChange={(e, response) => onChange(response.name, response.value)}
            />
        );
    }
}

export const Select = injectIntl(SelectComponent);

export const Checkbox = injectIntl(props => (
    <SemanticCheckbox
        {...props}
        label={props.intl.formatMessage({id: props.labelid})}
        onChange={(e, response) => props.onChange(response.name, response.checked)}
    />
));