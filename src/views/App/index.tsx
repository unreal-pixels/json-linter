import React from 'react';
import './App.scss';
import { Header, Wrapper } from '@unrealpixels/common-lib';
import { type RouteComponentProps, withRouter } from 'react-router-dom';

class App extends React.Component<RouteComponentProps> {
  state = {
    text: '',
    error: false,
    errorReason: '',
  };

  private parseJson = (): void => {
    const { text } = this.state;

    try {
      const newValue: unknown = JSON.parse(text);
      this.setState({ error: false, text: JSON.stringify(newValue, undefined, 2) });
    } catch (error) {
      this.setState({ error: true, errorReason: String(error) });
    }
  };

  componentDidMount (): void {
    const { history } = this.props;
    const route = localStorage.getItem('route');

    if (route) {
      localStorage.removeItem('route');
      history.push(route);
    }
  }

  render (): React.ReactNode {
    const { text, error, errorReason } = this.state;

    return (
      <>
        <Header productName="JSON Linter" />
        <Wrapper>
          {error && <div className="json-error"><pre>{errorReason}</pre></div>}
          <label className="json-entry--label" htmlFor="json-entry">Enter or Paste JSON</label>
          <textarea className="json-entry" rows={25} id='json-entry' value={text} onChange={event => { this.setState({ text: event.target.value }); }} />
          <button type="button" className="json-entry--button" disabled={!text} onClick={this.parseJson}>Parse JSON</button>
        </Wrapper>
      </>
    );
  }
}

export default withRouter(App);
