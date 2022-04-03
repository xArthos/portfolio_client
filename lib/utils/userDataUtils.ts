// Modules
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

// Queries Schemas
export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      _id
      name {
        firstName
        secondName
        lastName
        firstName
      }
      nickname
      type
      email {
        current
        isVerified
        oldEmails
      }
      avatar {
        source
        blockAvatar {
          color
        }
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query getUserById($_id: ObjectId!) {
    user(_id: $_id) {
      _id
      name {
        firstName
        secondName
        lastName
        firstName
      }
      nickname
      type
      email {
        current
        isVerified
        oldEmails
      }
      avatar {
        source
        blockAvatar {
          color
        }
      }
    }
  }
`;

//////////////////
// Query Functions

// GET CURRENT USER
export const useGetCurrentUser = () => {
  const props = useQuery(GET_CURRENT_USER);
  console.log(props);

  if (!props.data) {
    props.data = { currentUser: {} };
  };

  return props;
};

// GET USER QUERY
export const useGetUserById = (_id: any) => {
  const props = useQuery(GET_USER_QUERY, { variables: { _id }, skip: !_id || _id === null });
  // console.log(props)
  if (!props.data) {
    props.data = { user: {} };
  };

  return props;
};