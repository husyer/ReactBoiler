import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axileLogo from '../../../static/images/axile.png'
import Grid from '@material-ui/core/Grid';

import styled from 'styled-components'

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 194,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

const ReponsiveCard = styled.span`
  max-width:400px;
  @media (max-width: 500px) {
    width:100%;
  }
`;
class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes } = this.props;

    return (
      <ReponsiveCard >
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }

            title="Freelance"
            subheader="Mai 2017 - Janvier 2018 "
          />
          <CardContent>
            <Typography variant="title" component="p">
              Développeur Web Drupal 7 & 8
            </Typography>

          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Description du poste:
              </Typography>
              <Typography paragraph>
              Développement de trois projets similaires pour la société AXILE.<br/>
              Chacuns des projets etaient constitué d'un espace administrateur, un espace client ainsi que d'un formulaire complexe destiné aux clients.
              Enfin l'espace administrateur permet la recuperation des données client et sont traitées via une macro excel pour generer un rapport deifinit par Axile.
              </Typography>

            </CardContent>
          </Collapse>
        </Card>
      </ReponsiveCard>
    );
  }
}


export default withStyles(styles)(RecipeReviewCard);