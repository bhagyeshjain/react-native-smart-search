### INTRODUCTION
---
**react-native-smart-search** is a smart search box component that provides a user-friendly UI with a variety of features and animations.
This component includes functionalities such as search input, filter options, and customizable behaviors like expansion and collapsibility. It is designed to enhance the search experience in React Native applications.

### CONFIGURATION PROPERTIES
---
| Property | Type | Default Value | Description |
|:---|:---|:---|:---|
|placeHolder|String|"Search"|The placeholder text displayed in the input box.|
|onSearch|Function|None|Callback function that is triggered when a search is performed.|
|filterOptions|Object[]|None|An array of filter options to be displayed alongside the search box. Each option should be an object with properties like `label` and `value`.|
|onChangeFilterOption|Function|None|Callback function that is triggered when the filter option is changed. Receives the selected filter option object.|
|onSubmit|Function|None|Callback function that is triggered when the user presses enter or clicks the search button.|
|isCollapsible|Boolean|TRUE|Option to enable / disable the collapsible property of the search box.|
|isExpanded|Boolean|FALSE|Option to set the expanded property of the search box. Always TRUE if `isCollapsible = FALSE`. If TRUE, the search box wil be displayed in expanded form by default.|

### INSTALLATION
```
npm install react-native-smart-search
```

or

```
yarn add react-native-smart-search
```

### #USAGE
---
```
import SmartSearchBox from 'react-native-smart-search';
```

### LICENSE
---
This project is licensed under the MIT License.

Copyright (c) 2024 [Bhagyesh Jain](https://github.com/bhagyeshjain)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
