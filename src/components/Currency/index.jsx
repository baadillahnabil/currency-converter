import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import accounting from 'accounting-js'

import { Grid, Paper, Typography, Button } from '@material-ui/core'

import styles from './styles'

const Currency = ({
  classes,
  rates,
  inputAmount,
  selectedRates,
  setSelectedRates
}) => (
  <>
    {Object.keys(selectedRates).map(key => (
      <Paper key={key} elevation={1} className={classes.currencyCard}>
        <Grid container wrap="nowrap">
          {/* Conversion Detail */}
          <Grid className={classes.detailSide}>
            <Grid container justify="space-between" alignItems="baseline">
              <Typography component="p" className={classes.cardCurrencyCode}>
                {key}
              </Typography>
              <Typography component="p" className={classes.cardAmount}>
                {accounting.formatMoney(rates[key] * inputAmount, {
                  symbol: key,
                  format: '%s  %v',
                  precision: 10
                })}
              </Typography>
            </Grid>
            {/* <Typography component='p' className={classes.currencyDesc}>
                  IDR - Indonesian Rupiah // Sorry, this data ngga ada di API nya :( padahal udah dibikin
                </Typography> */}
            <Typography component="p" className={classes.unitRate}>
              1 USD ={' '}
              {accounting.formatMoney(rates[key], {
                symbol: key,
                format: '%s  %v',
                precision: 10
              })}
            </Typography>
          </Grid>

          {/* Delete Button */}
          <Button
            variant="text"
            className={classes.buttonDelete}
            onClick={() => {
              const selected = { ...selectedRates }
              delete selected[key]
              setSelectedRates(selected)
            }}
          >
            x
          </Button>
        </Grid>
      </Paper>
    ))}
  </>
)

Currency.propTypes = {
  classes: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  inputAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  selectedRates: PropTypes.object.isRequired,
  setSelectedRates: PropTypes.func.isRequired
}

export default withStyles(styles)(Currency)
