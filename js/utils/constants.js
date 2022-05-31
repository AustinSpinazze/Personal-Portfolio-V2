export const JAVASCRIPT = `class\xa0Person\xa0{\n\xa0\xa0\xa0constructor(name,\xa0traits,\xa0year)\xa0{\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0this.name\xa0=\xa0name;\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0this.traits\xa0=\xa0traits;\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0this.age\xa0=\xa0new Date().getFullYear() - year;\n\xa0\xa0\xa0\xa0}\n}\n\nconst\xa0person\xa0=\xa0new\xa0Person(\n\xa0\xa0\xa0\xa0"Austin Spinazze",\n\xa0\xa0\xa0\xa0["Developer,\xa0Consultant],\n\xa0\xa0\xa0\xa01994\n);`;

export const TYPESCRIPT = `interface IPerson\xa0{\xa0\n\xa0\xa0\xa0\xa0name:\xa0string\n\xa0\xa0\xa0\xa0traits:\xa0string[]\n\xa0\xa0\xa0\xa0age:\xa0number\n}\n\nconst\xa0person:\xa0IPerson\xa0=\xa0{\xa0\n\xa0\xa0\xa0\xa0name:\xa0"Austin Spinazze"\n\xa0\xa0\xa0\xa0traits:\xa0["Developer", "Consultant"]\n\xa0\xa0\xa0\xa0age:\xa0new\xa0Date().getFullYear()\xa0-\xa01994\n}`;

export const GOLANG = `type\xa0Person\xa0struct\xa0{\n\xa0\xa0\xa0\xa0name\xa0string\n\xa0\xa0\xa0\xa0traits\xa0[]string\n\xa0\xa0\xa0\xa0age\xa0int\n}\n\nfunc\xa0main()\xa0{\n\xa0\xa0\xa0\xa0person\xa0:=\xa0Person{\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0name:\xa0"Austin Spinazze"\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0traits:\xa0[]string{"Developer", "Consultant"}\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0age:\xa0new\xa0Date().getFullYear()\xa0-\xa01994\n\xa0\xa0\xa0\xa0}\n}`;

export const JAVA = `import\xa0java.time.YearMonth;\npublic\xa0class\xa0Person\xa0{\n\xa0\xa0\xa0\xa0String\xa0name;\n\xa0\xa0\xa0\xa0String[]\xa0traits;\n\xa0\xa0\xa0\xa0int\xa0age;\n\n\xa0\xa0\xa0\xa0public\xa0Person()\xa0{\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0this.name\xa0 = 'Austin Spinazze';\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0this.traits\xa0 =\xa0{ 'Developer', \xa0'Consultant' };\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0this.age\xa0=\xa0YearMonth.now().getYear() - 1994;\n\xa0\xa0\xa0\xa0}\n}`