import Preview from '../src/components/preview'

export default { title: 'Preview' }

export const preview = () => <Preview data={data} />

const data = {
  link: '',
  meta: { date: '', title: '' },
}
