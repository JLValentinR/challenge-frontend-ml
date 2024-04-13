import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Detalle from './src/app/pages/items/[id]/page.tsx';
 
it('renders homepage unchanged', () => {
    const { container } = render(<Detalle params={{ id: 'MLA1397418693' }} />)
    expect(container).toMatchSnapshot()
})