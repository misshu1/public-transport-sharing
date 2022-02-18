import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export function TextInput({
    type,
    value,
    className,
    label,
    placeholder,
    name,
    error,
    invalid,
    readOnly,
    disabled = false,
    margin,
    width,
    onChange,
    onFocus,
    onBlur,
    onSubmit,
    ...props
}) {
    const [passwordShown, setPasswordShown] = useState(false);

    function handlePasswordVisibilityToggle() {
        setPasswordShown((s) => !s);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' && onSubmit) {
            event.preventDefault();
            event.stopPropagation();
            onSubmit();
        }
    }

    function handleBlur(e) {
        onBlur && onBlur(e);
    }

    return (
        <Container className={className} margin={margin} width={width}>
            <Layout>
                {label && <Label htmlFor={name}>{label}</Label>}
                <Input
                    {...props}
                    type={passwordShown ? 'text' : type}
                    id={name}
                    invalid={!!error || invalid}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-label={label}
                    aria-disabled={disabled}
                    aria-readonly={readOnly}
                    readOnly={readOnly}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onFocus={onFocus}
                />
                {type === 'password' && (
                    <Show onClick={handlePasswordVisibilityToggle}>
                        {passwordShown ? 'hide' : 'show'}
                    </Show>
                )}
            </Layout>
            {!!error && (
                <Error>
                    <FontAwesomeIcon
                        icon={['fas', 'exclamation-triangle']}
                        style={{ marginRight: '2px' }}
                        size='xs'
                    />
                    {error}
                </Error>
            )}
        </Container>
    );
}

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: ${({ margin }) =>
        margin?.top ? `${margin.top}px` : undefined};
    margin-bottom: ${({ margin }) =>
        margin?.bottom ? `${margin.bottom}px` : undefined};
    margin-left: ${({ margin }) =>
        margin?.left ? `${margin.left}px` : undefined};
    margin-right: ${({ margin }) =>
        margin?.right ? `${margin.right}px` : undefined};
    width: ${({ width }) =>
        width !== undefined
            ? typeof width === 'string'
                ? width
                : `${width}px`
            : 'auto'};
`;

export const Layout = styled.div`
    height: 56px;
    position: relative;
    width: inherit;
`;

export const Input = styled.input`
    display: flex;
    align-items: center;
    border-radius: 6px;
    height: 100%;
    outline: none;
    width: 100%;
    transition: all 0.2s;
    color: #000000;
    border: solid 1px ${({ invalid }) => (invalid ? 'red' : '#E8E9FC')};
    padding: 28px 16px 9px 16px;
    font-size: 14px;

    :focus {
        border-color: ${({ invalid }) => (invalid ? 'red' : '#000000')};
    }

    :disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    :not(:disabled) {
        :hover {
            box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.12);
        }

        :active {
            border-color: ${({ invalid }) => (invalid ? 'red' : '#000000')};
        }
    }

    ::placeholder {
        color: #ced0ea;
    }
`;

export const Label = styled.label`
    position: absolute;
    color: #131ba3;
    font-weight: 700;
    left: 16px;
    top: 9px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

export const Error = styled.p`
    font-size: 12px;
    color: red;
    font-weight: 500;
`;

export const Show = styled.p`
    font-size: 12px;
    font-weight: 700;
    color: #131ba3;
    position: absolute;
    right: 16px;
    top: 50%;
    margin: 0;
    padding: 2px 8px;
    background-color: #e8e9fc;
    border-radius: 2px;
    transform: translateY(-50%);
    cursor: pointer;
    text-transform: capitalize;
`;
