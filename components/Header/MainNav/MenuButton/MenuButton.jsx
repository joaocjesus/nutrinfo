import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const MenuButton = ({ menu, disabled, classes }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { name, options } = menu;

  const handleToggle = (event, childElement = false) => {
    // Fix for clicking an child element of Button; overrides click with Button (parent) click
    if (childElement) {
      event.preventDefault();
      event.stopPropagation();
      anchorRef.current.click();
      return;
    }
    // If there are no options, just go to the link
    if (!options) {
      Router.push(menu.link);
    }
    // Otherwise, open or close the menu
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const getWidth = () => {
    if (anchorRef && anchorRef.current) {
      return anchorRef.current.offsetWidth;
    }
  };

  const handleMenuItemClick = (page) => {
    setOpen(false);
    Router.push(page);
  };

  // return focus to the button when transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.name}
      // disabled={disabled}
      >
        {name}
        {options && (
          <span
            className={classes.icon}
            onClick={(e) => handleToggle(e, true)}
          >
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </span>
        )}
      </Button>
      {options && options.length > 0 && <Popper style={{ minWidth: getWidth() }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            timeout={200}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.container}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {options.map((item, index) => {
                    if (item.divider) {
                      return <hr key={index} className={classes.divider} />;
                    }
                    return (
                      <MenuItem key={item.label}
                        onClick={() => handleMenuItemClick(item.link)}
                        button={true}
                        className={classes.link}
                        disabled={item.disabled}
                      >
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>}
    </>
  );
};

MenuButton.propTypes = {
  menu: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default MenuButton;
