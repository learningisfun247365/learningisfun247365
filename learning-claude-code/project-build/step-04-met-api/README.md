# Step 4: Working with APIs - MET Museum Data

**The build begins:** Now you start building your actual art history timeline project.

---

## Learning Objectives

By the end of this step, you should be able to:

- [ ] Understand how REST APIs work
- [ ] Make HTTP requests to an API
- [ ] Parse and understand JSON responses
- [ ] Handle API errors gracefully
- [ ] Structure and save data locally
- [ ] Use Claude Code to help with API integration

---

## Key Concepts

### **1. What is a REST API?**

A REST API is a way for programs to request data over the internet.

**Key concepts:**
- **Endpoint** - A URL that provides specific data
- **Request** - Asking the API for data
- **Response** - What the API sends back (usually JSON)
- **Status codes** - Tell you if the request worked (200 = success, 404 = not found)

### **2. The MET Museum API**

The Metropolitan Museum of Art provides free API access to their collection.

**Base URL:** `https://collectionapi.metmuseum.org/public/collection/v1`

**Key endpoints:**
```
/objects                          # Get list of all object IDs
/objects/{objectID}               # Get details for specific object
/search?q={query}                 # Search for objects
```

**Example:**
```
https://collectionapi.metmuseum.org/public/collection/v1/objects/436535
```

**No API key required!** This makes it perfect for learning.

### **3. JSON Response Structure**

APIs return data in JSON format:

```json
{
  "objectID": 436535,
  "title": "The Starry Night",
  "artistDisplayName": "Vincent van Gogh",
  "objectDate": "1889",
  "medium": "Oil on canvas",
  "department": "European Paintings"
}
```

Your job: Understand this structure and extract what you need.

---

## Exploring the MET API

### **Exercise 1: Manual API Exploration**

**Goal:** Understand the API before writing code.

**Task:**
1. Open your browser
2. Visit: `https://collectionapi.metmuseum.org/public/collection/v1/objects/436535`
3. Look at the JSON response
4. Identify the fields you care about for your timeline:
   - Artist name
   - Object date
   - Title
   - Image URL
   - Department/medium

**Document in:** `exercises/api-exploration.md`
- What fields are available?
- Which ones are useful for a timeline?
- What fields are sometimes empty?
- How are dates formatted?

---

### **Exercise 2: Search for Artists**

**Goal:** Learn how to search the API.

**Task:**
1. Try the search endpoint in your browser:
   ```
   https://collectionapi.metmuseum.org/public/collection/v1/search?q=Picasso
   ```

2. What does it return?
3. Try different searches:
   - A specific artist
   - An art movement ("impressionism")
   - A time period

**Document in:** `exercises/search-exploration.md`
- How does search work?
- What does it return?
- How do you get from search results to actual object data?

---

## Building Your API Client

### **Exercise 3: First API Call with Python**

**Goal:** Make your first API request programmatically.

**Task:**
Ask Claude Code to help you create: `exercises/first_api_call.py`

**Requirements:**
```python
# Should:
# 1. Import the requests library
# 2. Make a request to get object 436535
# 3. Print the response status code
# 4. Print the JSON data (pretty-printed)
```

**Run it:**
```bash
python exercises/first_api_call.py
```

**What to observe:**
- Does it work?
- What does the status code tell you?
- Is the JSON readable?

---

### **Exercise 4: Extract Artist Information**

**Goal:** Parse JSON to get specific fields.

**Task:**
Ask Claude Code to create: `exercises/parse_artist_data.py`

**Requirements:**
```python
# Should:
# 1. Fetch an artwork object
# 2. Extract: title, artist name, date, medium
# 3. Print them in a readable format
# 4. Handle missing fields gracefully
```

**Expected output:**
```
Title: The Starry Night
Artist: Vincent van Gogh
Date: 1889
Medium: Oil on canvas
```

---

### **Exercise 5: Search and Fetch Multiple Objects**

**Goal:** Combine search with data fetching.

**Task:**
Ask Claude Code to create: `exercises/fetch_artist_works.py`

**Requirements:**
```python
# Should:
# 1. Search for an artist (e.g., "Monet")
# 2. Get the first 5 object IDs from search results
# 3. Fetch details for each object
# 4. Print a summary of each work
# 5. Handle API errors (some IDs might not have data)
```

**Challenge:**
- Some search results return hundreds of IDs
- Not all IDs have complete data
- You need to handle API rate limits

---

### **Exercise 6: Save Data Locally**

**Goal:** Store fetched data for later use.

**Task:**
Ask Claude Code to create: `exercises/save_artist_data.py`

**Requirements:**
```python
# Should:
# 1. Fetch data for an artist's works
# 2. Structure the data (list of dictionaries)
# 3. Save to JSON file
# 4. Include error handling
# 5. Print confirmation when done
```

**Output:**
A file like `data/monet_works.json` containing structured artwork data.

---

## Error Handling

### **Common Issues:**

**1. Network Errors**
```python
try:
    response = requests.get(url)
    response.raise_for_status()
except requests.exceptions.RequestException as e:
    print(f"Error fetching data: {e}")
```

**2. Missing Data**
```python
artist_name = data.get('artistDisplayName', 'Unknown')
```

**3. Rate Limiting**
```python
import time
time.sleep(0.5)  # Be nice to the API
```

---

## Building the Final Script

### **Exercise 7: Complete API Client**

**Goal:** Build a reusable API client for your project.

**Task:**
Ask Claude Code to help create: `completed/met_api_client.py`

**Features:**
```python
class METAPIClient:
    def search_artist(self, artist_name):
        """Search for artist and return object IDs"""
        pass

    def get_object_details(self, object_id):
        """Get full details for an object"""
        pass

    def get_artist_works(self, artist_name, limit=10):
        """Get multiple works for an artist"""
        pass

    def save_to_json(self, data, filename):
        """Save data to JSON file"""
        pass
```

**Test it:**
```python
client = METAPIClient()
works = client.get_artist_works("Picasso", limit=5)
client.save_to_json(works, "data/picasso_works.json")
```

---

## Resources

### **API Documentation:**
- [MET Museum API Docs](https://metmuseum.github.io/)
- [MET API GitHub](https://github.com/metmuseum/openaccess)

### **Python Requests:**
- [Requests library documentation](https://requests.readthedocs.io/)
- [Real Python: API Tutorial](https://realpython.com/python-api/)

### **JSON:**
- [Working with JSON in Python](https://realpython.com/python-json/)

---

## Deliverables

Before moving to Step 5, you should have:

- [ ] `exercises/api-exploration.md` - Manual API exploration notes
- [ ] `exercises/search-exploration.md` - Search endpoint exploration
- [ ] `exercises/first_api_call.py` - Your first API request
- [ ] `exercises/parse_artist_data.py` - JSON parsing practice
- [ ] `exercises/fetch_artist_works.py` - Multiple object fetching
- [ ] `exercises/save_artist_data.py` - Data persistence
- [ ] `completed/met_api_client.py` - Your reusable API client
- [ ] `data/` folder with sample JSON data files
- [ ] `lessons-learned.md` - Reflections on working with APIs

---

## Success Criteria

You're ready for Step 5 when you can:

✅ Explain how REST APIs work
✅ Make HTTP requests and handle responses
✅ Parse JSON data and extract needed fields
✅ Handle errors and missing data gracefully
✅ Search for and fetch multiple objects
✅ Save structured data to files
✅ Have a working API client for the MET Museum

---

## My Journey (To Be Completed)

**Time spent:** [To be filled]
**Most interesting discovery:** [To be filled]
**Biggest challenge:** [To be filled]
**Favorite artwork found:** [To be filled]

See my completed work in: `/completed/`

---

## Next Step

Once you've completed this step: [Step 5: Data Enrichment](../step-05-data-enrichment/README.md)
