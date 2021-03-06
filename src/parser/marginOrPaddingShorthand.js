CSSParser.prototype.parseMarginOrPaddingShorthand = function(token, aDecl, aAcceptPriority, aProperty)
{
  var top = null;
  var bottom = null;
  var left = null;
  var right = null;
  
  var values = [];
  while (true) {
    
    if (!token.isNotNull())
      break;
    
    if (token.isSymbol(";")
        || (aAcceptPriority && token.isSymbol("!"))
        || token.isSymbol("}")) {
      if (token.isSymbol("}"))
        this.ungetToken();
      break;
    }
    
    else if (!values.length && token.isIdent(this.kINHERIT)) {
      values.push(token.value);
      token = this.getToken(true, true);
      break;
    }
    
    else if (token.isDimension()
             || token.isNumber("0")
             || token.isPercentage()
             || token.isIdent("auto")) {
      values.push(token.value);
    }
    else
      return "";
    
    token = this.getToken(true, true);
  }
  
  var count = values.length;
  switch (count) {
    case 1:
      top = values[0];
      bottom = top;
      left = top;
      right = top;
      break;
    case 2:
      top = values[0];
      bottom = top;
      left = values[1];
      right = left;
      break;
    case 3:
      top = values[0];
      left = values[1];
      right = left;
      bottom = values[2];
      break;
    case 4:
      top = values[0];
      right = values[1];
      bottom = values[2];
      left = values[3];
      break;
    default:
      return "";
  }
  this.forgetState();
  aDecl.push(this._createJscsspDeclarationFromValue(aProperty + "-top", top));
  aDecl.push(this._createJscsspDeclarationFromValue(aProperty + "-right", right));
  aDecl.push(this._createJscsspDeclarationFromValue(aProperty + "-bottom", bottom));
  aDecl.push(this._createJscsspDeclarationFromValue(aProperty + "-left", left));
  return top + " " + right + " " + bottom + " " + left;
};

