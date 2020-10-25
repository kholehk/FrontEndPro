"use strict";

import { format } from 'date-fns'

const date = format(new Date(), 'iiii');

console.log("Hello, world!", date);