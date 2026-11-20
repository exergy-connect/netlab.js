import type { JsonObject } from "../types.js";

/** Auto-generated from data/defaults/*.yml — do not hand-edit. */
export const DEFAULTS_DATA: Record<string, JsonObject> = {
  "addressing": {
    "loopback": {
      "ipv4": "10.0.0.0/24"
    },
    "router_id": {
      "ipv4": "10.0.0.0/24",
      "prefix": 32
    },
    "lan": {
      "ipv4": "172.16.0.0/16"
    },
    "p2p": {
      "ipv4": "10.1.0.0/16"
    },
    "mgmt": {
      "ipv4": "192.168.121.0/24",
      "start": 100,
      "mac": "CA-FE-00-00-00-00"
    },
    "l2only": null,
    "vrf_loopback": {
      "ipv4": "10.2.0.0/24",
      "prefix": 32
    }
  },
  "attributes": {
    "global": {
      "addressing": {
        "type": "dict",
        "_keytype": "id"
      },
      "defaults": null,
      "groups": null,
      "links": null,
      "module": null,
      "name": {
        "type": "id",
        "_help": "Topology name should be no longer than 16 characters. It should start with a letter\nand contain letters, underscores or numbers. netlab derives it from the directory name\nwhen it's not specified in the lab topology file.\n"
      },
      "nodes": null,
      "plugin": {
        "type": "list",
        "_subtype": "str"
      },
      "prefix": {
        "type": "dict",
        "_keytype": "id",
        "_subtype": "_prefix"
      },
      "provider": "id",
      "tools": {
        "type": "dict",
        "_subtype": {
          "type": "dict",
          "create_empty": true
        }
      },
      "validate": {
        "type": "dict",
        "_keytype": "id",
        "_subtype": "_v_entry"
      },
      "version": null
    },
    "internal": {
      "input": null,
      "pools": "dict",
      "Provider": null,
      "Plugin": null,
      "message": "str"
    },
    "global_extra_ns": [
      "providers",
      "outputs"
    ],
    "can_be_false": [
      "link",
      "interface",
      "loopback"
    ],
    "link": {
      "bandwidth": "int",
      "bridge": "id",
      "disable": "bool",
      "shutdown": "bool",
      "name": "str",
      "linkid": "id",
      "prefix": {
        "type": "dict",
        "_keys": {
          "ipv4": {
            "type": "ipv4",
            "use": "subnet_prefix"
          },
          "ipv6": {
            "type": "ipv6",
            "use": "subnet_prefix"
          },
          "allocation": {
            "type": "str",
            "valid_values": [
              "p2p",
              "sequential",
              "id_based"
            ]
          },
          "_name": "str"
        },
        "_alt_types": [
          "bool_false",
          "prefix_str",
          "named_pfx"
        ]
      },
      "ra": {
        "disable": "bool",
        "slaac": "bool",
        "dhcp": {
          "type": "str",
          "valid_values": [
            "all",
            "other"
          ]
        },
        "onlink": "bool"
      },
      "role": "id",
      "pool": "id",
      "tc": {
        "delay": "time",
        "jitter": "time",
        "loss": {
          "type": "float",
          "min_value": 0,
          "max_value": 100
        },
        "corrupt": {
          "type": "float",
          "min_value": 0,
          "max_value": 100
        },
        "duplicate": {
          "type": "float",
          "min_value": 0,
          "max_value": 100
        },
        "reorder": {
          "type": "float",
          "min_value": 0,
          "max_value": 100
        },
        "rate": {
          "type": "int",
          "min_value": 1
        }
      },
      "type": {
        "type": "str",
        "valid_values": [
          "lan",
          "p2p",
          "stub",
          "loopback",
          "tunnel",
          "vlan_member"
        ]
      },
      "unnumbered": "bool",
      "interfaces": null,
      "mtu": {
        "type": "int",
        "min_value": 64,
        "max_value": 9216
      },
      "vlan_name": "id"
    },
    "link_internal": {
      "linkindex": "int",
      "parentindex": "int"
    },
    "link_no_propagate": [
      "prefix",
      "interfaces",
      "gateway"
    ],
    "link_module_no_propagate": [
      "vlan",
      "dhcp"
    ],
    "interface": {
      "node": "node_id",
      "ipv4": {
        "type": "ipv4",
        "use": "interface"
      },
      "ipv6": {
        "type": "ipv6",
        "use": "interface"
      },
      "ifindex": "int",
      "ifname": "str",
      "linkid": "id"
    },
    "node_extra_ns": [
      "providers",
      "tools",
      "outputs"
    ],
    "node": {
      "name": "str",
      "interfaces": "list",
      "module": {
        "type": "list",
        "_subtype": "id"
      },
      "device": "device",
      "box": "str",
      "id": {
        "type": "int",
        "min_value": 1,
        "max_value": "MAX_NODE_ID"
      },
      "config": {
        "type": "dict",
        "_subtype": {
          "type": "error",
          "_err_msg": "Enable \"files\" plugin to use the inline node/group configuration template(s)"
        },
        "_alt_types": [
          "list"
        ]
      },
      "skip_config": "list",
      "group": "list",
      "role": {
        "type": "str",
        "valid_values": [
          "router",
          "host",
          "bridge",
          "gateway"
        ]
      },
      "router_id": {
        "type": "ipv4",
        "use": "id"
      },
      "mgmt": {
        "ipv4": {
          "type": "ipv4",
          "use": "interface"
        },
        "ipv6": {
          "type": "ipv6",
          "use": "interface"
        },
        "mac": "str",
        "ifname": "str"
      },
      "mtu": {
        "type": "int",
        "min_value": 64,
        "max_value": 9216
      },
      "loopback": {
        "type": "dict",
        "_alt_types": [
          "bool"
        ]
      },
      "provider": "id",
      "cpu": null,
      "memory": "int",
      "unmanaged": "bool"
    },
    "loopback": {
      "ipv4": {
        "type": "ipv4",
        "use": "host_prefix",
        "_alt_types": [
          "bool"
        ]
      },
      "ipv6": {
        "type": "ipv6",
        "use": "host_prefix",
        "_alt_types": [
          "bool"
        ]
      },
      "pool": "addr_pool"
    },
    "pool": {
      "ipv4": {
        "type": "ipv4",
        "use": "subnet_prefix"
      },
      "ipv6": {
        "type": "ipv6",
        "use": "subnet_prefix"
      },
      "start": {
        "type": "int",
        "min_value": 0
      },
      "prefix": {
        "type": "int",
        "min_value": 1,
        "max_value": 32
      },
      "prefix6": {
        "type": "int",
        "min_value": 1,
        "max_value": 128
      },
      "allocation": {
        "type": "str",
        "valid_values": [
          "p2p",
          "sequential",
          "id_based"
        ]
      },
      "mac": "mac",
      "unnumbered": "bool"
    },
    "pool_no_copy": [
      "start",
      "prefix",
      "prefix6",
      "mac"
    ],
    "prefix": {
      "ipv4": {
        "type": "ipv4",
        "use": "subnet_prefix"
      },
      "ipv6": {
        "type": "ipv6",
        "use": "subnet_prefix"
      },
      "allocation": {
        "type": "str",
        "valid_values": [
          "p2p",
          "sequential",
          "id_based"
        ]
      }
    },
    "node_group": {
      "_description": "Node groups",
      "_namespace": [
        "node"
      ],
      "members": {
        "type": "list",
        "_subtype": {
          "type": "id",
          "max_length": "MAX_NODE_ID_LENGTH"
        }
      },
      "vars": "dict",
      "config": "list",
      "node_data": {
        "type": "dict",
        "true_value": {}
      },
      "device": "device",
      "module": "list"
    },
    "vlan_group": {
      "_description": "VLAN groups",
      "_namespace": [
        "vlan",
        "link"
      ],
      "type": "str",
      "members": {
        "type": "list",
        "_subtype": "id"
      }
    },
    "vrf_group": {
      "_description": "VRF groups",
      "_namespace": [
        "vrf"
      ],
      "type": "str",
      "members": {
        "type": "list",
        "_subtype": "id"
      }
    },
    "_prefix": {
      "ipv4": {
        "type": "ipv4",
        "use": "prefix"
      },
      "ipv6": {
        "type": "ipv6",
        "use": "prefix"
      },
      "allocation": {
        "type": "str",
        "valid_values": [
          "p2p",
          "sequential",
          "id_based"
        ]
      },
      "pool": {
        "type": "str",
        "_valid_with": [
          "allocation"
        ]
      }
    },
    "_v_entry": {
      "_description": "Single network validation test (an entry in the validate dictionary)",
      "description": "str",
      "fail": "str",
      "pass": "str",
      "wait": {
        "type": "int",
        "_alt_types": [
          "id"
        ]
      },
      "wait_msg": "str",
      "nodes": {
        "type": "list",
        "_subtype": "node_id"
      },
      "devices": {
        "type": "list",
        "_subtype": "device"
      },
      "exec": "_v_option",
      "show": "_v_option",
      "ansible": "_v_option",
      "config": {
        "template": "str",
        "variable": "dict",
        "inline": {
          "type": "error",
          "_err_msg": "Enable \"files\" plugin to use the \"inline\" configuration template"
        },
        "_alt_types": [
          "str"
        ]
      },
      "valid": "_v_option",
      "suzieq": {
        "_alt_types": [
          "str"
        ],
        "show": "str",
        "expect": {
          "type": "str",
          "valid_values": [
            "empty"
          ]
        },
        "valid": {
          "type": "str",
          "valid_values": [
            "all",
            "any"
          ]
        }
      },
      "plugin": "str",
      "stop_on_error": "bool",
      "level": {
        "type": "str",
        "valid_values": [
          "warning"
        ]
      }
    },
    "_v_option": {
      "_description": "A \"show\", \"exec\" or \"valid\" parameter in a network validation test. It's a\ndictionary of device types with each value being a command to execute or\nexpression to evaluate.\n",
      "type": "dict",
      "_alt_types": [
        "str"
      ],
      "_keytype": {
        "type": "device",
        "include_templates": true
      }
    },
    "_r_import": {
      "_description": "Routing protocol import specification. Each entry specifies a protocol to\nimport. Values might contain routing policies\n",
      "type": "dict",
      "_keytype": "r_proto",
      "_list_to_dict": true,
      "_subtype": {
        "_alt_types": [
          "NoneType",
          "bool"
        ],
        "policy": {
          "type": "id",
          "_requires": [
            "routing"
          ]
        }
      }
    },
    "_clab_stage": {
      "wait-for": {
        "type": "list",
        "_subtype": {
          "node": "node_id",
          "stage": "str"
        }
      },
      "exec": "list"
    }
  },
  "const": {
    "routing_protocols": [
      "bgp",
      "connected",
      "eigrp",
      "isis",
      "ospf",
      "ripv2",
      "static"
    ],
    "vrf_igp_protocols": [
      "connected",
      "ospf",
      "isis",
      "ripv2"
    ],
    "multi_provider": [
      "libvirt",
      "clab"
    ],
    "ifname": {
      "neighbors": 5,
      "maxlength": 255
    },
    "MAX_NODE_ID": 150,
    "doc_url_prefix": "https://netlab.tools/"
  },
  "hints": {
    "evpn": {
      "irb_group": "All VLANs that are part of a VRF using asymmetric IRB have to be present on all nodes using that VRF. The easiest way to achieve that is to create a group with all participating nodes and list VLANs in the 'vlans' attribute of that group\n",
      "node_attr": "evpn.bundle and evpn.transit_vni attributes can be used only in global VRF definition\n",
      "asn": "You could use the global 'bgp.as' parameter to specify the AS to use in EVPN route targets. 'bgp.as' specified on individual nodes or groups will not work. You can also specify the global AS used by EVPN in 'vrf.as' parameter if you use VRFs, or in 'evpn.as' parameter if you use EVPN in bridging-only scenarios.\n",
      "ebgp_vlan": "In most scenarios, you don't need EBGP sessions between PE-devices across an EVPN-controlled VLAN. See https://netlab.tools/module/evpn/#evpn-rp for details.\n"
    },
    "report": {
      "source": "A report can be specified in a file with .j2 suffix within 'reports' subdirectory in package-, system-, user- or current directory. You can also specify a report in a defaults.outputs.report setting.\n"
    },
    "junos": {
      "single_lb": "Junos devices cannot have more than one loopback interface per routing instance\n"
    },
    "vlan": {
      "mixed_fwd_check": "You can disable this error with \"defaults.vlan.warnings.mixed_fwd_check: False\", but then you might get the same IP prefix assigned to multiple segments of the routed VLAN.\n",
      "trunk_attr": "You should not use layer-3 attributes on VLAN trunks. Specify them in global- or node 'vlans' dictionary. See https://netlab.tools/module/vlan/#vlan-interface-parameters for details.\n"
    },
    "vrf": {
      "inactive": "A globally-defined VRF is not used on a node unless that node is attached to a VRF link, or has the VRF listed in the node 'vrfs' dictionary and uses VRF loopbacks.\n"
    },
    "cli": {
      "recreate": "netlab transforms lab topology into device- and platform data and stores the results in a snapshot file that is used by most netlab commands. Changes to source files (including lab topology or defaults) are not automatically reflected in the snapshot file. Use 'netlab create' or 'netlab up' to create a new snapshot file.",
      "interrupt": "Use 'netlab status' command to display the status of your lab and 'netlab down --cleanup' command to clean it up. You might have to use the '--force' option of the 'netlab down' command."
    },
    "routing": {
      "policy": {
        "match_af": "A routing policy 'match.prefix' condition can match a single address family. Use 'match.af' parameter to specify the address family you want to match."
      },
      "host_gw": "Hosts attached to routers need a shared gateway or a gateway of last resort. In both cases, at least one adjacent router needs a real (not unnumbered/LLA) IP address."
    },
    "validation": {
      "nodes": "A test that uses 'show', 'exec', 'ansible' or 'plugin' action must specify the nodes on which that action will be executed.",
      "valid": "A test that includes the 'valid' check must generate some output to check. That output can be generated with 'show','exec','suzieq', or 'ansible' action.",
      "show": "The 'show' action should return structured data that is then validated with the 'valid' check. If you want to execute a command on the device without checking the results, use the 'exec' action."
    },
    "libvirt": {
      "capture": "Change the link type to Linux bridge with 'type: lan' link attribute or see\nhttps://netlab.tools/labs/libvirt/#libvirt-capture for other options.\n"
    },
    "nodes": {
      "unmanaged_device": "Netlab uses the node device type for unmanaged nodes to figure out what features the node supports. If you're using a device that is not supported by netlab, set the device type to 'none'."
    },
    "support": {
      "best-effort": "While a core contributor might still work on the platform, we don't run integration tests",
      "minimal": "Don't expect too much (particularly new functionality)",
      "obsolete": "These platforms are still part of the netlab package because the storage prices keep falling"
    }
  },
  "ports": {
    "ssh": 22,
    "http": 80,
    "https": 443,
    "netconf": 830
  },
  "warnings": {
    "duplicate_address": true
  }
};

