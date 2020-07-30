import { linkTo } from '@storybook/addon-links'
import { Welcome } from '@storybook/react/demo'
import { action } from '@storybook/addon-actions'
import { Button } from '@storybook/react/demo'

export default { title: 'Welcome' }

export const toStorybook = () => <Welcome showApp={linkTo('Button')} />

export const withText = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
)

export const withSomeEmoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
)
