import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Modal, {IModal} from './index';


const setUp = (props:IModal) => render(<Modal {...props} />);
describe('modal', () => {
    test('add new order', async () => {
        const props: IModal = {
            selectedInfo: null,
            submitFn: jest.fn(),
            closeFn: jest.fn()
        };
        await wait(() => {
            setUp(props);
        })
        expect(screen.getByText('Order drinks')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeDisabled();

        await wait(() => {
            userEvent.type(screen.getByTestId('name'), 'QA test');
        })
        await wait(() => {
            userEvent.type(screen.getByTestId('drinkName'), 'Pearl Milk tea');
        })
        expect(screen.getByText('Submit')).toBeEnabled();
        await wait(() => {
            userEvent.click(screen.getByText('Submit'));
        })
        await wait(() => {
            expect(props.submitFn).toHaveBeenCalled();
        })
    })
})