# Client Side Programming - CLIENT

For this assessment I used Apollo Server, Apollo client, lodash and React. I used a Graphql implementation because I believe a lot of the logic could be moved to the backend, keeping React mainly as a view engine. Considering the fact that the Brewers API is not giving the data in the desired format, there was a risk that too much data restructuring and cleaning logic would end up in the view. That only proved to be partly true. I choose Apollo because of it's back- and front-end caching capabilities. This made an extra caching server redundant. As a nice extra I got a state management library and a front-end caching solution. For the filtering and restructuring I made extensive use of lodash and javascripts native map function.

You can find the SERVER code <a href="https://github.com/Piepongwong/pixel.widgets.client">here</a>.

## Left To Do
Because of time constraints I didn't get to finish the filter functionalities. I would also have liked to add nested grouping. For example, I would have liked to group by region first and than by type or the other way around. 

The app is also not properly tested nor is it deployed, let alone in a CI/CD fashion. I would have liked to split the view and server up in separate Docker containers and orchestrate them using Kubernetes. I'm going to put this on my wishlist for santa. ;)