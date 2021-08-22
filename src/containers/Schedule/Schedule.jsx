

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

const Schedule = (props) => {

    let history = useHistory();

    //HOOKS

    return(
        <div classNamee="viewSchedule">
            Hello, this is Schedule
        </div>
    )
}

export default connect(Schedule);