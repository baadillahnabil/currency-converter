import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'

import {
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Select,
  MenuItem
} from '@material-ui/core'
import Currency from '../components/Currency'

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
        <Currency
          rates={rates}
          inputAmount={inputAmount}
          selectedRates={selectedRates}
          setSelectedRates={setSelectedRates}
        />

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
