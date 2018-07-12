import React, { Component } from 'react'
import JobCard from '../UI/jobCard/cards'
import Axa from '../UI/jobCard/JobAxa'
import Obbc from '../UI/jobCard/jobObbc'
import JobLaPoste from '../UI/jobCard/jobLaPoste'
import JobObbcStage from '../UI/jobCard/jobObbcStage'
import MaPhotoCard from '../UI/jobCard/maPhotoCard'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export class Home extends Component {
  render() {
    const styles = {
      root: {
        height: 100 + '%',
        overflowX: "hidden",
      }
    }
    return (
      <div style={styles.root}>

        <Grid justify="center" container>
          <Grid sm={12} item>
            <Typography variant="display3" gutterBottom>Qui suis-je ?</Typography>
          </Grid>
          <Grid sm={8} xs={12} item>
            <Typography variant="subheading" gutterBottom>
              Je suis un un developpeur web de 28 ans ayant decouvert react quelques mois auparavant.
              En effet après avoir terminer mon dernier contrat en tant que freelance sous drupal je decidais d'effectuer une veille technologique
              pour decouvrir les dernieres technologies front-end. J'avais deja essaye Angular auparavant et j'avais apprecier jouer avec les differentes fonctionnalités
              proposes je le mit donc de cote car je voulais decouvrir quelque chose qui m'etait completement inconnu.
              C'est la que je suis tombe sur React une librairie javascript pas specialement recente mais dont je n'avais entendu parle.
              je decouvri aussi qu'un nouveau framework denomme Vue.JS apparement inspire par react et selom la toile plus facile d'acces.
              Cependant je choisis de me focalisé sur react car malgres la diffuculte d'apprentissage les developpeurs disent qu'apprendre react
              vous feras enormement progresser en Javascript pure et par la meme ocasion vous apprendrez Javascrit ES6.
          </Typography>
          </Grid>
          <Grid justify="center" sm={4} xs={12} item>
            <MaPhotoCard />
          </Grid>

        </Grid>
        <Grid justify="center" container>
        <Typography variant="display3" gutterBottom>Mon experience professionnel</Typography>

        <Grid item xs={12}>
            <JobCard />
            <Axa />
            <Obbc />
            <JobLaPoste />
            <JobObbcStage />
            </Grid>
        </Grid>
      </div>

    )
  }
}

export default Home
