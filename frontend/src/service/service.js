// services/service.js
import axios from 'axios';  // Use axios or axiosInstance if you have set one up

const API_URL = 'https://script.google.com/macros/s/AKfycbxyG3QzyWtRQ3Vtm9HtuNnzfChQX9ydyue4Q555sBYyAE0bN_VhejY5swDGL3dm2YpmUQ/exec'; // Replace with your actual API URL

// getAllContacts
export const getAllContacts = async (sheetName) => {
  try {
    const response = await axios.get(API_URL, 
      {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        maxRedirects: 5, // Similar to "redirect: follow" in fetch
        params: {
          method: "getAllContacts",
          sheetName: sheetName
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching all contacts: ' + error.message);
  }
};

// getContactById
export const getContactById = async (sheetName, id) => {
  try {
    const response = await axios.get(API_URL, 
      {
        params: {
          method: "getContactById",
          sheetName: sheetName,
          id: id
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching contact by id: ' + error.message);
  }
};

// getAllDisciples
export const getAllDisciples = async (sheetName) => {
  try {
    const response = await axios.get(API_URL, 
      {
        params: {
          method: "getAllDisciples",
          sheetName: sheetName
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching all disciples: ' + error.message);
  }
};

// getDiscipleById
export const getDiscipleById = async (sheetName, id) => {
  try {
    const response = await axios.get(API_URL, 
      {
        params: {
          method: "getDiscipleById",
          sheetName: sheetName,
          id: id
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching disciple by id: ' + error.message);
  }
};

// countAll
export const countAll = async (sheetName) => {
  try {
    const response = await axios.get(API_URL, 
      {
        params: {
          method: "countAll",
          sheetName: sheetName
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching count all: ' + error.message);
  }
};

// countActive
export const countActive = async (sheetName) => {
  try {
    const response = await axios.get(API_URL, 
      {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        maxRedirects: 5, // Similar to "redirect: follow" in fetch
        params: {
          method: "countActive",
          sheetName: sheetName
        }
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching count active: ' + error.message);
  }
};

// countActiveContacts
export const countActiveContacts = async (sheetName) => {
  try {
    const response = await axios.get(API_URL, 
      {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        maxRedirects: 5, // Similar to "redirect: follow" in fetch
        params: {
          method: "countActiveContacts",
          sheetName: sheetName
        }
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching count active contacts: ' + error.message);
  }
};

// countDisciples
export const countDisciples = async (sheetName) => {
  try {
    const response = await axios.get(API_URL, 
      {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        maxRedirects: 5, // Similar to "redirect: follow" in fetch
        params: {
          method: "countDisciples",
          sheetName: sheetName
        }
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching all contacts: ' + error.message);
  }
};

// getCGNames
export const getCGNames = async () => {
  try {
    const response = await axios.get(API_URL, 
      {
        params: {
          method: "getCGNames",
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching all disciples: ' + error.message);
  }
};

// getMyCGNames
export const getMyCGNames = async (username) => {
  try {
    const response = await axios.get(API_URL, 
      {
        params: {
          method: "getMyCGNames",
          name: username
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error my CGs: ' + error.message);
  }
};

export const getCGByName = async (name) => {
  try {
    const response = await axios.get(API_URL, 
      {
        params: {
          method: "getCGByName",
          cgName: name
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error my CGs: ' + error.message);
  }
};

// Method to login (search for a user by name)
export const login = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(API_URL, data, 
    {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error during login: ' + error.message);
  }
};

// Method to add a new contact
// Method to add a new contact
export const addContact = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error("Error adding contact: " + error.message);
  }
};


// Method to edit an existing contact
export const editContact = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error updating contact: ' + error.message);
  }
};

// Method to edit an existing contact
export const editDisciple = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error updating disciple: ' + error.message);
  }
};

// Method to edit an existing contact
export const changeToDisciple = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error changing to disciple: ' + error.message);
  }
};

// Method to edit an existing contact
export const changeToContact = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error changing to contact: ' + error.message);
  }
};

// Method to archive a contact
export const archiveContact = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const editContactInfo = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const editContactProgress = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const editDiscipleInfo = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const editDiscipleProgress = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const addCG = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const editCG = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const editPOC = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const removeFromCG = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const editCGInfo = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const removeFromCGSheet = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error archiving contact: ' + error.message);
  }
};

export const deleteCG = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      maxRedirects: 5, // Similar to "redirect: follow" in fetch
    });
    return response.data;
  } catch (error) {
    throw new Error('Error deleting CG: ' + error.message);
  }
};