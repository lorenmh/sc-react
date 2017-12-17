# Repository for SquadCalc
![SquadCalc screenshot](/screenshot.png)
SquadCalc is an artillery calculator for the game [Squad](http://joinsquad.com/).

The site is currently up at [http://squadcalc.com](http://squadcalc.com).

The original SquadCalc application was a vanilla JS app which converted input strings into map locations, then used linear interpolation to output the artillery inputs. It also outputted the distance and bearing from mortars to targets.

The first SquadCalc application is located in [this repository](https://github.com/lorenmh/squadcalc). The first app was only ~400 lines of inscrutible code, which can be seen [here](https://github.com/lorenmh/squadcalc/blob/master/app.js).

This is V2 of SquadCalc, which was rewritten with React/Redux. This allowed the application to be a lot more robust. Now users can save locations, can make adjustments, can switch between rocket or mortar artillery. Especially helpful now is an SVG beneath the location inputs which displays the current location information. This SVG is interactive, allowing users to quickly input locations with mouse-clicks.

The SVG was written without any external libraries; it's just React and vanilla SVG elements. The source code can be seen in [GridView.jsx](https://github.com/lorenmh/sc-react/blob/master/src/containers/GridView.jsx).

I wasn't planning on open sourcing the code, so there aren't many comments. In the future I may add some.
