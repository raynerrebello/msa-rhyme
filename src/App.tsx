import * as React from 'react';

import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from './withRoot';

import { Button, Input, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) =>
  createStyles({
    button:{
      margin: theme.spacing.unit * 10
    },
    info:{
      margin: theme.spacing.unit * 10
    },
    output:{
      margin: theme.spacing.unit * 10
    },
    root: {
      margin: theme.spacing.unit,
      paddingTop: theme.spacing.unit * 10,
      textAlign: 'center'
    }
  });

interface IState {
  shown: string;
  entered: string;
};

class App extends React.Component<WithStyles<typeof styles>, IState> {
  
  constructor(props: any){
    super(props);
    this.state = {
      entered: '',
      shown: ''
    };
  }

  public handleClick = () => {
    if (this.state.entered.length > 0) {
      this.getRhyme();
    }
  };

  public getRhyme = () => {
    fetch('https://api.datamuse.com/words?rel_rhy=' + this.state.entered)
    .then((response: Response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject('Request failed idiot.');
      }
    }).then((results: object) => {
       this.setState({shown: results[0].word});
    }).catch((error: Error) => {
      this.setState({shown: 'A rhyme can\'t be found for ' + this.state.entered + ' please try another word.'});
    });
  }

  public handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({entered: event.target.value});
  }

  public render() {
    return (
      <div className={this.props.classes.root}>

        <div className= {this.props.classes.info}>
        <Typography variant="display1" gutterBottom={false}>
          Word Rhymer
        </Typography>
        <Typography variant="subheading" gutterBottom={false}>
          MSA 2018
        </Typography>
        </div>

        <Input
          placeholder="Enter word you wish to rhyme"
          fullWidth={true}
          onChange={this.handleTyping}
        />

        <div className={this.props.classes.button}>
        <Button variant="raised" color="secondary" onClick={this.handleClick}>
          Rhyme
        </Button>
        </div>

        <div className={this.props.classes.output}>
        <Typography variant="body1" gutterBottom={false}>
          {this.state.shown}
        </Typography>
        </div>

      </div>

    );
  }

}

export default withRoot(withStyles(styles)(App));

