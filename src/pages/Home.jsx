import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const Home = () => {
  const navigate = useNavigate();
  const [formvalues, setformvalues] = useState({
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
  });
  const [checked, setChecked] = useState(true);

  const [emailerror, setemailerror] = useState(false);
  const [passerror, setpasserror] = useState(false);
  const [firstnameerror, setfirstnameerror] = useState(false);
  const [addresserror, setaddresserror] = useState(false);
  const [phoneerror, setphoneerror] = useState(false);
  const [countrycodeerror, setcountrycodeerror] = useState(false);
  const handleChange = event => {
    setChecked(event.target.checked);
  };

  const steps = ['Form 1', 'Form 2', 'Form 3'];
  const onSubmit = () => navigate('/posts');
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    console.log(activeStep);
    if (activeStep === 0) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formvalues.emailId)) {
        setemailerror(true);
      } else if (
        !/(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[!@#$%]){2})/.test(formvalues.password)
      ) {
        setpasserror(true);
      } else if (
        !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/.test(formvalues.emailId) &&
        !/(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[!@#$%]){2})/.test(formvalues.password)
      ) {
        setemailerror(true);
        setpasserror(true);
      } else {
        setemailerror(false);
        setpasserror(false);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      if (formvalues.firstName.length < 2) {
        setfirstnameerror(true);
      } else if (formvalues.address.length < 10) {
        setaddresserror(true);
      } else if (formvalues.firstName.length < 2 && formvalues.address.length < 10) {
        setaddresserror(true);
        setfirstnameerror(true);
      } else {
        setaddresserror(false);
        setfirstnameerror(false);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    } else if (activeStep === 2) {
      if (!checked) {
        window.alert('check please');
      } else if (formvalues.phoneNumber.length < 10) {
        setphoneerror(true);
      } else if (!formvalues.countryCode) {
        setcountrycodeerror(true);
      } else {
        setphoneerror(false);
        setcountrycodeerror(false);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <div style={{ height: '100vh' }}>
      <div className="bg-danger p-5 mb-5 w-100 d-flex justify-content-center h-100">
        <div className="w-50 d-flex flex-column justify-content-center gap-5">
          <Stepper activeStep={activeStep}>
            {steps.map(label => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div className="d-flex justify-content-center flex-column align-items-center gap-2">
            {activeStep === steps.length - 1 ? (
              <>
                <div className="d-flex justify-content-center flex-column gap-5">
                  <FormControl
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">Code</InputLabel>
                    <Select
                      error={countrycodeerror}
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formvalues.countryCode}
                      label="Code"
                      onChange={e => setformvalues({ ...formvalues, countryCode: e.target.value })}
                    >
                      <MenuItem value={+91}>+91</MenuItem>
                      <MenuItem value={+1}>+1</MenuItem>
                    </Select>
                    <TextField
                      error={phoneerror}
                      size="small"
                      // helperText="10 Digits Only"
                      label="Phone Number"
                      id="phoneNumber"
                      value={formvalues.phoneNumber}
                      onChange={e => {
                        if (
                          (/^\d+$/.test(e.target.value) || e.target.value.length === 0) &&
                          e.target.value.length <= 10
                        ) {
                          setformvalues({ ...formvalues, phoneNumber: e.target.value });
                        }
                      }}
                    />
                  </FormControl>
                  <div className="d-flex flex-row align-items-center">
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Typography>Accept terms and conditions</Typography>
                  </div>
                </div>
              </>
            ) : activeStep === 0 ? (
              <>
                <TextField
                  size="small"
                  label="Email ID"
                  fullWidth
                  id="emailid"
                  helperText="Invalid Format"
                  error={emailerror}
                  value={formvalues.emailId}
                  onChange={e => setformvalues({ ...formvalues, emailId: e.target.value })}
                />
                <TextField
                  size="small"
                  fullWidth
                  error={passerror}
                  helperText="Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters."
                  label="Password"
                  id="password"
                  value={formvalues.password}
                  onChange={e => setformvalues({ ...formvalues, password: e.target.value })}
                />
              </>
            ) : activeStep === 1 ? (
              <>
                <TextField
                  fullWidth
                  size="small"
                  error={firstnameerror}
                  inputProps={{ maxLength: 50 }}
                  label="First Name"
                  helperText="Minimum of 2 character and maximum 50."
                  id="firstName"
                  value={formvalues.firstName}
                  onChange={e => {
                    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                      setformvalues({
                        ...formvalues,
                        firstName: e.target.value,
                      });
                    }
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ maxLength: 50 }}
                  label="Last Name"
                  id="lastName"
                  value={formvalues.lastName}
                  onChange={e => {
                    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                      setformvalues({
                        ...formvalues,
                        lastName: e.target.value,
                      });
                    }
                  }}
                />
                <TextField
                  fullWidth
                  error={addresserror}
                  helperText="Minimum length 10."
                  size="small"
                  label="Address"
                  id="address"
                  value={formvalues.address}
                  onChange={e => setformvalues({ ...formvalues, address: e.target.value })}
                />
              </>
            ) : (
              ''
            )}
          </div>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={activeStep === steps.length - 1 ? onSubmit : handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </div>
      </div>
      {/* <Container>
        <Form>
          <Button onClick={onSubmit}>Goto Posts</Button>
        </Form>
      </Container> */}
    </div>
  );
};

export default Home;
