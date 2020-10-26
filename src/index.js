"use strict";

import { format } from 'date-fns'

const date = format(new Date(), 'IIII.mm.ss');

console.log("Hello, world!", date);