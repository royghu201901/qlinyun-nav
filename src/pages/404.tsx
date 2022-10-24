

import type { CSSProperties } from 'react'
import { history } from 'umi'
import {
  MouseParallaxChild,
  MouseParallaxContainer
} from 'react-parallax-mouse'
import type { Theme } from '@material-ui/core/styles'
import {
  alpha,
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import {
  Box,
} from '@material-ui/core'
// import img from './1.svg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // width: '100%',
      height: '100vh',
      overflowX: 'hidden',
      position: 'relative',
    },
    outerCircle: {
      width: '800px',
      height: '800px',
      // backgroundColor: alpha(theme.palette.common.white, 0.2),
      borderRadius: '100%',
    },
    innerCircle: {
      width: '600px',
      height: '600px',
      backgroundColor: alpha(theme.palette.common.white, 0.1),
      borderRadius: '100%',
    },
    errorText: {
      fontFamily: 'Barlow',
      fontSize: '200px',
      fontWeight: 700,
      letterSpacing: '4px',
    },
    errorShadow: {
      fontFamily: 'Barlow',
      fontSize: '200px',
      fontWeight: 700,
      letterSpacing: '4px',
      color: alpha(theme.palette.common.white, 0.2),
      animationDelay: '1s',
      filter: 'blur(5px)',
    },
    backToHomeBtn: {
      position: 'absolute',
      left: '50%',
      top: '65%',
      transform: 'translate(-50%, 0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing(5),
      padding: theme.spacing(0, 4),
      cursor: 'pointer',
      zIndex: 300,
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
      fontWeight: 600,
    },
  })
)

const parallaxStyles: CSSProperties = {
  filter: 'invert(1)',
  position: 'absolute',
  zIndex: 100,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'auto',
  height: '100%'
}

const NoFoundPage = () => {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.container}>
        <MouseParallaxContainer
          className="parallax"
          containerStyles={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "auto"
          }}
          resetOnLeave
        >
          <MouseParallaxChild
            factorX={0.15}
            factorY={0.05}
            updateStyles={{
              ...parallaxStyles,
              width: '100%'
            }}
          >
            <Box className={classes.outerCircle}>
              <div className="one" data-depth="0.9">
                <div className="content">
                  <span className="piece" />
                  <span className="piece" />
                  <span className="piece" />
                </div>
              </div>

              <div className="two" data-depth="0.60">
                <div className="content">
                  <span className="piece" />
                  <span className="piece" />
                  <span className="piece" />
                </div>
              </div>

              <div className="three" data-depth="0.40">
                <div className="content">
                  <span className="piece" />
                  <span className="piece" />
                  <span className="piece" />
                </div>
              </div>
            </Box>
          </MouseParallaxChild>
          <MouseParallaxChild
            factorX={0.1}
            factorY={0.025}
            updateStyles={{
              ...parallaxStyles,
              width: '100%'
            }}
          >
            <Box className={classes.innerCircle} />
          </MouseParallaxChild>
          <MouseParallaxChild
            factorX={0.2}
            factorY={0.1}
            updateStyles={{
              ...parallaxStyles,
              zIndex: 200,
            }}
          >
            <Box className={classes.errorText}>
              404
            </Box>
          </MouseParallaxChild>
          <MouseParallaxChild
            factorX={0.15}
            factorY={0.05}
            updateStyles={{
              ...parallaxStyles,
            }}
          >
            <Box className={classes.errorShadow}>
              404
            </Box>
          </MouseParallaxChild>
        </MouseParallaxContainer>
        <Box
          className={classes.backToHomeBtn}
          borderRadius={50}
          boxShadow={3}
          onClick={() => history.push('/')}
        >
          返回首页
        </Box>
      </Box>
    </>
  )
}

export default NoFoundPage
