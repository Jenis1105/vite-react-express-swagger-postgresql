import React from 'react'
import styled from 'styled-components'

type AvatarProps = {
    url?: string; // The prop type definition
    user?: string;
};

const Avatar : React.FC<AvatarProps>= ({ url, user }) => {
    // console.log(url)
  return (
    <Wrapper className='d-flex justify-content-center align-content-center'>
        {
            url ? (
                <AvatarWrapper className=''>
                    <Image src={url} alt={user} width={100} height={100} className='img-responsive rounded-circle border border-2' />
                </AvatarWrapper>
            ) : (
                <NameWraper>{user}</NameWraper>
            )
        }
    </Wrapper>
  )
}

export default Avatar

const Wrapper = styled.div``

const AvatarWrapper = styled.div`
width: 200px;
`

const NameWraper = styled.div`
`
const Image = styled.img``