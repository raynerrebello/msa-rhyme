import * as React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from './withRoot';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20,
      paddingBottom: theme.spacing.unit * 40,
      padding: theme.spacing.unit * 50,
      margin: theme.spacing.unit
    },

  });

type State = {
  shown: string;
  entered: string;
};

class App extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    shown: '',
    entered: ''
  };

  handleClick = () => {
    if (this.state.entered.length > 0) {
      this.getRhyme();
    }
  };

  getRhyme = () => {
    fetch('https://api.datamuse.com/words?rel_rhy=' + this.state.entered)
    .then((response: Response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject('Request failed idiot.');
      }
    }).then((results: Object) => {
       this.setState({shown: results[0].word});
    }).catch((error: Error) => {
      this.setState({shown: 'A rhyme can\'t be found for ' + this.state.entered + ' please try another word.'});
    });
  }

  handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({entered: event.target.value});
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Typography variant="display1" gutterBottom>
          Word Rhymer
        </Typography>
        <Typography variant="subheading" gutterBottom>
          MSA 2018
        </Typography>
        <Input
          placeholder="Enter word you wish to rhyme"
          fullWidth={true}
          onChange={this.handleTyping}
        />
        <Button variant="raised" color="secondary" onClick={this.handleClick}>
          Rhyme
        </Button>
        <Typography variant="body1" gutterBottom>
          {this.state.shown}
        </Typography>
      </div>

    );
  }
}

export default withRoot(withStyles(styles)(Index));

