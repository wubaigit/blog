#!/bin/bash

create-react-app $1 --scripts-version=react-scripts-ts

cd $1

yarn start