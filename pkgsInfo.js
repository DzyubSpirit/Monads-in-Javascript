let pkgs = [ 
  {handshake:[0,'example'],marcus:'7b458e1a9dda....67cb7a3e'},
  {handshake:[0],ok:'9b71d224bd62...bcdec043'},
  {call:[17,'auth'],newAccount:['Payload data']},
  {callback:[17, 'chat'],ok:[15703]},
  {callback:[397, 'chat'],error:[4,'Data validation failed']}
];

let pkgTypes = ['call', 'callback', 'event', 'state', 'stream', 'handshake', 'health', 'inspect'],
    pkgTypesCount = pkgTypes.length;

module.exports = { pkgs, pkgTypes, pkgTypesCount }
