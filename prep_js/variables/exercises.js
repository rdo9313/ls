1) let name = "Victor";
`Good Morning, ${name}.`;
`Good Afternoon, ${name}.`;
`Good Evening, ${name}.`;

3) We get an error saying the variable is undefined because the variable was declared within a block.

4) NAME variable can't be reassigned to a different value since it was declared with const.

5) The program logs 'bar'. The foo variable initalized within the block lives in a different scope than the
foo variable declared before the block and therefore although the names are the same, are two different variables.

6) The program will return 'bar' since the variables are two different variables existing in different scopes.