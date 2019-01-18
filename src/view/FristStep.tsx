import * as React from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

interface InterFristStepProps {
    changeFunc: any;
}

export default class FristStep extends React.Component<InterFristStepProps, {}> {
    public state = {
        value: 1,
    };
    constructor(props: any) {
        super(props);
    }
    public onChange = (e: any) => {
        this.setState({
            value: e.target.value,
        });
        this.props.changeFunc(e.target.value);
    }
    public render() {
        return (
            <RadioGroup onChange={this.onChange} value={this.state.value}>
                <div>
                    <Radio value={1}>类别一</Radio>
                </div>
                <div>
                    <Radio value={2}>类别二</Radio>
                </div>
                <div>
                    <Radio value={3}>类别三</Radio>
                </div>
                <div>
                    <Radio value={4}>类别四</Radio>
                </div>
            </RadioGroup>
        );
    }
}