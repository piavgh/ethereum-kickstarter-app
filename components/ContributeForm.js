import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';

class ContributeForm extends Component {
    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Amount To Contribute</label>
                    <Input label="ether" labelPosition="right" />
                </Form.Field>
                <Button>Contribute!</Button>
            </Form>
        );
    }
}

export default ContributeForm;
