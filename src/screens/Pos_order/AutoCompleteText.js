import React from "react";
import { shallowEqual } from "../../ultis/shallowEqual";
import ReactDOM from "react-dom";

const LENGTH_NUM_SEARCH = 3;

export default class AutoCompleteText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      suggestions: [],
      text: props.value,
      indexSelect: -1,
      isShow: true,
    };
  }
  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside, true);
  };
  handleClickOutside = (event) => {
    try {
      const domNode = ReactDOM.findDOMNode(this);

      if (!domNode || !domNode.contains(event.target)) {
        {
          this.setState(() => ({ isShow: false }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentWillReceiveProps(nextProps, nextState) {
    if (!shallowEqual(this.props.items, nextProps.items)) {
      this.setState({
        items: nextProps.items,
      });

      var suggestions = this.findSuggestion(this.state.text, nextProps.items);
      this.setState(() => ({ suggestions }));
    }

    if (!shallowEqual(this.props.value, nextProps.value)) {
      this.setState({
        text: nextProps.value,
      });
    }
  }

  findSuggestion = (text, items = []) => {
    let suggestions = [];

    try {
      const regex = new RegExp(`^${text}`, "i");

      var item2 = items.length == 0 ? this.state.items : items;
      suggestions = item2.sort().filter((v) => regex.test(v.phone_number));

      var newSug = [];
      suggestions.forEach((element) => {
        var p1 = element.phone_number.indexOf(text);
        newSug.push({
          ...element,
          p1: p1,
          p2: p1 + text.length,
        });
      });
    } catch (err) {
      return suggestions;
    }

    return newSug;
  };

  onTextChanged = (e) => {
    var value = e.target.value;

    if (value !== "" && (isNaN(value) || Number(value) < 0)) return;

    let suggestions = [];
    if (value.length > 0 && value.length > LENGTH_NUM_SEARCH) {
      suggestions = this.findSuggestion(value);
      //  suggestions = this.state.items
    }

    this.setState(() => ({ suggestions, text: value, isShow: true }));
    this.props.onChange(value);

    if (value.length > LENGTH_NUM_SEARCH) {
      this.onSearch(value);
    }
  };

  suggestionSeletected(value) {
    this.setState(() => ({
      text: value.phone_number,
      suggestions: [],
      indexSelect: -1,
    }));
    this.props.onSelected(value);
  }

  rederSuggestion() {
    const { suggestions } = this.state;
    if (suggestions.length == 0) {
      return null;
    }

    return (
      <div
        class={`bootstrap-autocomplete dropdown-menu ${
          this.state.isShow ? "show" : "hide"
        }`}
      >
        {suggestions.map((item, index) => {
          var text = item.phone_number + " " + item.name;
          text = (
            <div>
              {text.substring(0, item.p1)}
              <b>{text.substring(item.p1, item.p2)}</b>
              {text.substring(item.p2)}
            </div>
          );

          return (
            <a
              class="dropdown-item"
              onClick={() => this.suggestionSeletected(item)}
              className={
                this.state.indexSelect == index
                  ? "dropdown-item active"
                  : "dropdown-item"
              }
            >
              {text}
            </a>
          );
        })}
      </div>
    );
  }

  onKeyDownChange = (isAdd) => {
    const { suggestions, indexSelect } = this.state;

    if (suggestions.length == 0) {
      this.setState({
        indexSelect: -1,
      });
    } else {
      if (isAdd == true && suggestions.length > 0) {
        if (indexSelect <= -1) {
          this.setState({
            indexSelect: 0,
          });
        } else if (indexSelect == suggestions.length - 1) {
          this.setState({
            indexSelect: 0,
          });
        } else {
          this.setState({
            indexSelect: indexSelect + 1,
          });
        }
      }

      if (isAdd == false && suggestions.length > 0) {
        if (indexSelect <= -1) {
          this.setState({
            indexSelect: suggestions.length - 1,
          });
        } else {
          this.setState({
            indexSelect: indexSelect - 1,
          });
        }
      }
    }
  };

  handleKeyDown = (event) => {
    var KEY_DOWN = 40;
    var KEY_UP = 38;
    var KEY_ENTER = 13;

    if (event.keyCode === KEY_DOWN) {
      this.onKeyDownChange(true);
    }

    if (event.keyCode === KEY_UP) {
      this.onKeyDownChange(false);
    }

    if (event.keyCode === KEY_ENTER) {
      const { suggestions, indexSelect } = this.state;

      if (indexSelect > -1 && indexSelect < suggestions.length) {
        this.suggestionSeletected(suggestions[indexSelect]);
      }
    }

    this.props._recordInput("onKeyUp", event);
  };

  onSearch = (va) => {
    this.props.onSearch(va);
  };

  render() {
    const { text } = this.state;
    const { placeholder, icon, value, onChange, name, disabled, autocomplete } =
      this.props;
    var handleKeyPress = {
      onKeyUp: (event) => {
        this.props._recordInput("onKeyUp", event);
      },
    };
    return (
      <div className="dropdown open in" onKeyDown={this.handleKeyDown}>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text px-2" title="Điện thoại (F4)">
              <i class={icon}></i>
            </span>
          </div>

          <input
            type="text"
            class="form-control customerInfo"
            {...handleKeyPress}
            placeholder={placeholder}
            id="phone_number_customer"
            data-startsuggest="6"
            value={text}
            onKeyDown={this.handleKeyDown}
            onChange={this.onTextChanged}
            name={name}
            onSearch={this.onSearch}
            disabled={disabled}
            onSelected={this.onSelected}
            autocomplete={autocomplete}
            style={{
              fontSize: "13px",
              height: `calc(2.25rem + 2px)`,
            }}
          />

          {this.rederSuggestion()}
        </div>
      </div>
    );
  }
}
