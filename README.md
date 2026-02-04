# Macropad CLI

A customizable command-line tool for creating keyboard shortcuts and terminal commands to quickly launch applications, open URLs, and execute shell commands.

## Features

- **Interactive Keyboard Mode**: Press keys to trigger actions instantly
- **Terminal Command Mode**: Execute actions using custom commands
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Customizable**: Define your own macros in a JSON configuration file
- **Multiple Action Types**:
  - Open applications
  - Launch URLs in your default browser
  - Execute shell commands

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Leonardo-Garzon-1995/mcro.git
cd macropad-cli
```

2. Set up your macros:
```bash
cp macros.json.example macros.json
```

4. Edit `macros.json` to add your own macros

or use the `mcro config` command to set them up interactively.

## Usage

### Command Structure

```bash
mcro <command> [options]
```

### Available Commands

#### Cofinguration command
```bash
mcro config <option>
```
```bash
mcro config add      # add a new macro
mcro config delete <key>  # remove an existing macro by its key
mcro config update <key> <attribute>  # update an existing macro by its key and attribute
mcro config view <key>  # view details of a specific macro by its key
```
#### Interactive/Keyboard Mode
Launch interactive mode where you can press keys to execute actions:
```bash
mcro interactive
# or
mcro keyboard
```

#### List Available Keys
View all configured keyboard shortcuts:
```bash
mcro keys
```

#### List Available Commands
View all configured terminal commands:
```bash
mcro myCommands
```

#### Configuration
Manage your macros configuration:
```bash
mcro config <option>
```

#### Execute a Macro by Command
Run a specific macro by its command name:
```bash
mcro <command-name>
```

For example, if you have a macro with `"command": "github"`:
```bash
mcro github
```

## Structure

### Macros File Structure

Create a `macros.json` file in the project root with the following structure:

```json
[
    {
        "key": "g",
        "command": "github",
        "label": "open github in web browser",
        "action": {
            "type": "open_url",
            "url": "https://github.com"
        }
    },
    {
        "key": "v",
        "command": "vscode",
        "label": "open vscode app",
        "action": {
            "type": "open_app",
            "path": "C:/Users/username/AppData/Local/Programs/Microsoft VS Code/Code.exe"
        }
    },
    {
        "key": "n",
        "command": "nv",
        "label": "node version",
        "action": {
            "type": "run_cmd",
            "cmd": "node -v"
        }
    }
]
```

### Macro Object Properties

- **`key`** (string): Single character used in keyboard mode
- **`command`** (string): Command name used in terminal mode
- **`label`** (string): Description of what the macro does
- **`action`** (object): Action to execute

### Action Types

#### 1. Open URL
Opens a URL in the default web browser:
```json
{
    "type": "open_url",
    "url": "https://example.com"
}
```

#### 2. Open Application
Launches an application by its path:
```json
{
    "type": "open_app",
    "path": "/path/to/application.exe"
}
```

**Note**: Use absolute paths to your applications. Paths vary by operating system:
- **Windows**: `C:/Users/username/AppData/Local/...`
- **macOS**: `/Applications/...`
- **Linux**: `/usr/bin/...` or application name if in PATH

#### 3. Run Command
Executes a shell command:
```json
{
    "type": "run_cmd",
    "cmd": "node -v"
}
```

## Example usage

### Example 1: Quick App Launcher
```bash
mcro interactive
# Press 'c' to open ChatGPT
# Press 's' to open Spotify
# Press 'v' to open VS Code
```

### Example 2: Terminal Commands
```bash
mcro github    # Opens GitHub in browser
mcro nv        # Shows Node.js version
mcro claude    # Launches Claude app
```

### Example 3: Check Available Options
```bash
mcro keys           # See all keyboard shortcuts
mcro myCommands     # See all terminal commands
```
### Example 4: configuration commands
- Add a new macro:
```bash
mcro config add # You will be prompted to enter details
```
- Delete a macro:
```bash
mcro config delete g # Deletes macro with key 'g'
```
- Update a macro:
```bash
mcro config update g label "open github in web browser" # Updates the 'label' attribute of macro with key 'g'
```
- View a macro:
```bash
mcro config view g # Views details of macro with key 'g'
```

## Platform-Specific Notes

### Windows
- Uses PowerShell and CMD for executing commands
- Application paths typically in `C:/Users/<username>/AppData/...`

### macOS
- Uses `open` command for apps and URLs
- Application paths typically in `/Applications/...`

### Linux
- Uses `xdg-open` for URLs
- Supports background process execution

## Development

### Project Structure
```
macropad-cli/
├── bin/
│   └── main.js           # Entry point
├── lib/
│   ├── actions.js        # Action execution logic
│   ├── config.js         # Configuration management
│   ├── helpers.js        # Utility functions
│   ├── interactive.js    # Keyboard mode
│   └── terminal_mode.js  # Terminal command mode
├── macros.json           # Your custom macros (not in repo)
├── macros.json.example   # Example configuration
└── package.json
```

### Running Locally
```bash
npm start
# or
node ./bin/main.js <command>
```

## License

MIT

## Author

Leonardo Garzon <lgarzonlc@gmail.com>

## Contributing

Feel free to submit issues and pull requests!
