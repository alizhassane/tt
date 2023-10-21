import React, { useState } from 'react';

interface Category {
  name: string;
  sub: { name: string }[];
}

const CategorySelector: React.FC = () => {
  const categories: Category[] = [
    {
      name: "metal",
      sub: [
        { name: "iron" },
        { name: "gold" },
        { name: "bronze" },
        { name: "silver" },
        { name: "aluminum" },
      ],
    },
    {
      name: "hardware",
      sub: [
        { name: "motherboard" },
        { name: "gpu" },
        { name: "cpu" },
        { name: "ram" },
        { name: "ssd" },
      ],
    },
    {
      name: "software",
      sub: [
        { name: "vsc" },
        { name: "chrome" },
        { name: "brave" },
        { name: "winrar" },
        { name: "idm" },
      ],
    },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<{
    [category: string]: string[];
  }>({});

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedCategory = event.target.value;
    if (selectedCategories.length < 2 && !selectedCategories.includes(selectedCategory)) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    } else {
      alert("Category already chosen.");
    }
    event.target.value = '';
  }

  function handleSubCategoryChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    category: string
  ) {
    const updatedSelectedSubCategories = { ...selectedSubCategories };
    if (!updatedSelectedSubCategories[category]) {
      updatedSelectedSubCategories[category] = [];
    }
    if (updatedSelectedSubCategories[category].length < 2 && !updatedSelectedSubCategories[category].includes(event.target.value)) {
      updatedSelectedSubCategories[category].push(event.target.value);
    } else {
      alert("Subcategory already chosen for this category.");
    }
    event.target.value = '';
    setSelectedSubCategories(updatedSelectedSubCategories);
  }

  function handleDeleteCategory(index: number) {
    const updatedCategories = [...selectedCategories];
    updatedCategories.splice(index, 1);
    setSelectedCategories(updatedCategories);

    const updatedSelectedSubCategories = { ...selectedSubCategories };
    delete updatedSelectedSubCategories[selectedCategories[index]];
    setSelectedSubCategories(updatedSelectedSubCategories);
  }

  function handleDeleteSubCategory(category: string, index: number) {
    const updatedSelectedSubCategories = { ...selectedSubCategories };
    updatedSelectedSubCategories[category].splice(index, 1);
    setSelectedSubCategories(updatedSelectedSubCategories);
  }

  return (
    <div className="justify-content:center d-flex w-100 vh-100">
      <div className="w-50 mt-5">
        <div>
          <h2>Select Categories (up to 2)</h2>
          <select className="form-control" onChange={handleCategoryChange}>
            <option value="">-Category-</option>
            {categories.map((ctr) => (
              <option key={ctr.name} value={ctr.name}>
                {ctr.name}
              </option>
            ))}
          </select>
          {selectedCategories.map((selectedCategory, index) => (
            <div key={selectedCategory}>
              <h3>{selectedCategory}</h3>
              <button onClick={() => handleDeleteCategory(index)}>Delete</button>
              <select
                className="form-control"
                onChange={(event) =>
                  handleSubCategoryChange(event, selectedCategory)
                }
                value=""
              >
                <option value="">-Subcategory-</option>
                {categories
                  .find((cat) => cat.name === selectedCategory)
                  ?.sub.map((sub) => (
                    <option key={sub.name} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
              </select>
              <ul>
                {selectedSubCategories[selectedCategory]?.map((subCategory, subIndex) => (
                  <li key={subCategory}>
                    {subCategory}
                    <button
                      onClick={() => handleDeleteSubCategory(selectedCategory, subIndex)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
