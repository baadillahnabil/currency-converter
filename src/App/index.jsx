import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import accounting from 'accounting-js'

import {
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  Select,
  MenuItem
} from '@material-ui/core'

import API from '../services'

import styles from './styles'

const App = ({ classes }) => {
  const [inputAmount, setInputAmount] = useState(10)
  const [rates, setRates] = useState({})
  const [selectedRates, setSelectedRates] = useState({})

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const { data } = await API.get('/latest', {
          params: {
            base: 'USD'
          }
        })
        setRates(data.rates)
      } catch (error) {
        console.log({ ...error })
      }
    }

    fetchRates()
  }, [])

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.root}
    >
      {/* The Input Field */}
      <Paper elevation={2} className={classes.header}>
        <FormControl fullWidth className={classes.inputArea}>
          <InputLabel>USD - United States Dollar</InputLabel>
          <Input
            type="number"
            value={inputAmount}
            onChange={event => setInputAmount(event.target.value)}
            startAdornment={
              <InputAdornment position="start">USD</InputAdornment>
            }
            classes={{ input: classes.inputField }}
          />
        </FormControl>
      </Paper>

      <Typography component="p" className={classes.separator}>
        - to -
      </Typography>

      <Paper elevation={2} className={classes.conversion}>
        {/* Single Currency Card */}
        {Object.keys(selectedRates).map(key => (
          <Paper key={key} elevation={1} className={classes.currencyCard}>
            <Grid container wrap="nowrap">
              {/* Conversion Detail */}
              <Grid className={classes.detailSide}>
                <Grid container justify="space-between" alignItems="baseline">
                  <Typography
                    component="p"
                    className={classes.cardCurrencyCode}
                  >
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

        {/* Add Currency Button */}
        <FormControl fullWidth variant="outlined" className={classes.addNewBox}>
          <Select
            displayEmpty
            value=""
            onChange={event => {
              const selected = { ...selectedRates }
              selected[event.target.value] = rates[event.target.value]
              setSelectedRates(selected)
            }}
          >
            <MenuItem value="">Add New Currency</MenuItem>
            {Object.keys(rates).map(key => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Grid>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
