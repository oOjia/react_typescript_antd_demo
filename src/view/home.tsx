import * as React from 'react';
import logo from '../logo.svg';

const Title = () => <h1>Hello</h1>;

class Home extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div>
        <Title />
        <h2>hello zhaiyj</h2>
        <img src={logo} style={{ width: 200 }} alt="" />
      </div>
    );
  }
}

export default Home;