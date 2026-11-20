import type { JsonObject } from "../types.js";

/** Auto-generated from data/modules/*.yml — do not hand-edit. */
export const MODULE_DATA: Record<string, JsonObject> = {
  "bfd": {
    "min_echo_rx": 0,
    "multiplier": 3,
    "attributes": {
      "global": {
        "min_tx": {
          "type": "int",
          "min_value": 1
        },
        "min_rx": {
          "type": "int",
          "min_value": 1
        },
        "min_echo_rx": {
          "type": "int",
          "min_value": 0
        },
        "multiplier": {
          "type": "int",
          "min_value": 0
        }
      },
      "node": {
        "min_tx": null,
        "min_rx": null,
        "min_echo_rx": null,
        "multiplier": null
      },
      "link": {
        "min_tx": {
          "type": "int",
          "min_value": 1
        },
        "min_rx": {
          "type": "int",
          "min_value": 1
        },
        "min_echo_rx": {
          "type": "int",
          "min_value": 0
        },
        "multiplier": {
          "type": "int",
          "min_value": 0
        }
      }
    }
  },
  "bgp": {
    "no_propagate": {
      "ebgp_role": null,
      "advertise_roles": null,
      "rr_list": null,
      "as_list": null,
      "confederation": null
    },
    "transform_after": [
      "vlan"
    ],
    "config_after": [
      "routing",
      "ospf",
      "isis",
      "eigrp",
      "ripv2"
    ],
    "hooks": [
      "normalize"
    ],
    "advertise_roles": [
      "stub"
    ],
    "advertise_loopback": true,
    "community": {
      "ibgp": [
        "standard",
        "extended"
      ],
      "ebgp": [
        "standard"
      ]
    },
    "ebgp_role": "external",
    "next_hop_self": true,
    "_top": {
      "attributes": {
        "bgp_session_type": {
          "_description": "BGP session types",
          "type": "str",
          "valid_values": {
            "ibgp": null,
            "ebgp": null,
            "localas_ibgp": null
          }
        },
        "bgp_community_type": {
          "_description": "BGP community types",
          "type": "str",
          "valid_values": {
            "standard": null,
            "extended": null,
            "large": null,
            "2octet": null
          }
        },
        "bgp_prefix_list": {
          "_description": "BGP prefix list",
          "type": "list",
          "_subtype": {
            "ipv4": {
              "type": "ipv4",
              "use": "subnet_prefix"
            },
            "ipv6": {
              "type": "ipv6",
              "use": "subnet_prefix"
            },
            "_alt_types": [
              "prefix_str"
            ]
          }
        }
      }
    },
    "attributes": {
      "global": {
        "as": "asn",
        "next_hop_self": "bool",
        "rr_cluster_id": {
          "type": "ipv4",
          "use": "id"
        },
        "rr_list": "list",
        "rr_mesh": "bool",
        "ebgp_role": "str",
        "as_list": "dict",
        "sessions": {
          "ipv4": {
            "type": "list",
            "_subtype": "bgp_session_type"
          },
          "ipv6": {
            "type": "list",
            "_subtype": "bgp_session_type"
          }
        },
        "activate": {
          "ipv4": {
            "type": "list",
            "_subtype": "bgp_session_type"
          },
          "ipv6": {
            "type": "list",
            "_subtype": "bgp_session_type"
          }
        },
        "advertise_loopback": "bool",
        "advertise_roles": "list",
        "community": {
          "ibgp": {
            "type": "list",
            "_subtype": "bgp_community_type"
          },
          "ebgp": {
            "type": "list",
            "_subtype": "bgp_community_type"
          },
          "_value_to_dict": {
            "ibgp": "{value}",
            "ebgp": "{value}"
          }
        },
        "replace_global_as": "bool",
        "confederation": {
          "type": "dict",
          "_keytype": "asn",
          "_subtype": {
            "members": {
              "type": "list",
              "_subtype": "asn"
            }
          }
        }
      },
      "_inherit_community": {
        "localas_ibgp": "ibgp",
        "confed_ebgp": "ibgp"
      },
      "node": {
        "as": {
          "type": "asn",
          "_required": true
        },
        "next_hop_self": {
          "copy": "global"
        },
        "rr": "bool",
        "rr_cluster_id": {
          "copy": "global"
        },
        "rr_mesh": {
          "copy": "global"
        },
        "advertise": "bgp_prefix_list",
        "originate": "bgp_prefix_list",
        "advertise_loopback": {
          "copy": "global"
        },
        "sessions": {
          "copy": "global"
        },
        "activate": {
          "copy": "global"
        },
        "community": {
          "copy": "global"
        },
        "router_id": {
          "type": "ipv4",
          "use": "id"
        },
        "local_as": "asn",
        "replace_global_as": "bool",
        "import": "_r_import"
      },
      "vrf": {
        "router_id": {
          "type": "ipv4",
          "use": "id"
        },
        "advertise": "bgp_prefix_list",
        "originate": "bgp_prefix_list",
        "import": "_r_import"
      },
      "node_copy": [
        "local_as",
        "replace_global_as"
      ],
      "link": {
        "advertise": {
          "type": "bool",
          "_intra_as": true
        }
      },
      "interface": {
        "local_as": "asn",
        "replace_global_as": "bool"
      },
      "loopback": {
        "advertise": "bool"
      },
      "as_list": {
        "type": "dict",
        "_keytype": "int",
        "_subtype": {
          "name": "str",
          "members": {
            "type": "list",
            "_subtype": "str",
            "_required": true
          },
          "rr": {
            "type": "list",
            "_subtype": "str"
          }
        }
      }
    },
    "features": {
      "core": {
        "_title": null,
        "activate_af": "Can control activation of individual address families",
        "advertise": "Can advertise IGP prefixes",
        "local_as": "Supports local-as functionality",
        "vrf_local_as": "Supports local-as within a VRF",
        "local_as_ibgp": "Can use local-as to create IBGP sesssions",
        "ipv6_lla": "Can run EBGP sessions over IPv6 link-local addresses",
        "rfc8950": "Can run IPv4 AF over regular IPv6 EBGP sessions",
        "community": "Granular BGP community propagation",
        "confederation": "BGP confederations",
        "import": "Import routes from other routing protocols"
      },
      "session": {
        "_title": "BGP session parameters",
        "allowas_in": "Allow own AS in incoming AS path (allowas in)",
        "as_override": "Override AS in AS path",
        "bfd": "Use BFD to detect BGP neighbor failure",
        "default_originate": "Originate per-neighbor default route",
        "description": "Use \"description\" attribute",
        "gtsm": "Supports GTSM",
        "passive": "Supports passive BGP peers",
        "password": "Supports MD5 passwords",
        "remove_private_as": "Can remove private AS from AS path",
        "rs": "Can be a BGP route server",
        "rs_client": "Can be a client of a BGP route server",
        "timers": "Can configure BGP timers",
        "tcp_ao": "Supports TCP-AO session protection",
        "multihop": "Supports EBGP multihop sessions"
      },
      "policy": {
        "_title": "BGP policy parameters",
        "_default_locpref": "Device-wide local preference",
        "aggregate": "BGP route aggregation",
        "bandwidth": "Support BGP DMZ bandwidth"
      }
    },
    "warnings": {
      "missing_igp": true,
      "igp_list": [
        "ospf",
        "eigrp",
        "isis",
        "ripv2"
      ]
    }
  },
  "evpn": {
    "requires": [
      "bgp"
    ],
    "no_propagate": [
      "start_transit_vni",
      "transport",
      "vlan_bundle_service",
      "as"
    ],
    "transform_after": [
      "vlan",
      "vxlan",
      "vrf"
    ],
    "config_after": [
      "vlan",
      "vxlan",
      "vrf"
    ],
    "session": [
      "ibgp"
    ],
    "start_transit_vni": 200000,
    "attributes": {
      "global": {
        "session": [
          "ibgp",
          "ebgp"
        ],
        "start_transit_vni": {
          "type": "int",
          "min_value": 1,
          "max_value": 16777215
        },
        "transport": {
          "type": "str",
          "valid_values": [
            "vxlan",
            "mpls",
            "sr"
          ]
        },
        "vlans": "list",
        "vrfs": "list",
        "as": "asn"
      },
      "bundle": [
        "vlan_aware",
        "vlan",
        "port",
        "port_vlan"
      ],
      "node": {
        "session": null,
        "vlans": null,
        "vrfs": null,
        "domain": "str"
      },
      "vlan": {
        "evi": "rd",
        "rd": "rd",
        "import": "list",
        "export": "list"
      },
      "node_vlan": {
        "import": {
          "copy": "vlan"
        },
        "export": {
          "copy": "vlan"
        }
      },
      "vrf": {
        "transit_vni": {
          "type": "int",
          "min_value": 1,
          "max_value": 16777215,
          "_alt_types": [
            "str",
            "bool"
          ]
        },
        "bundle": {
          "type": "str",
          "valid_values": [
            "vlan_aware",
            "vlan",
            "port",
            "port_vlan"
          ]
        }
      }
    },
    "features": {
      "irb": "Supports symmetrical IRB (routing on ingress and egress)",
      "asymmetrical_irb": "Support asymmetrical IRB (routing on ingress, bridging on egress)",
      "bundle": "EVPN bundle service support",
      "multi_rt": "Multiple import/export route targets",
      "transport": "Supported data-plane encapsulations"
    }
  },
  "gateway": {
    "transform_after": [
      "vlan",
      "vrf",
      "ospf",
      "isis"
    ],
    "config_after": [
      "vlan",
      "vrf"
    ],
    "id": -2,
    "protocol": "anycast",
    "anycast": {
      "mac": "0200.cafe.00ff",
      "unicast": true
    },
    "vrrp": {
      "group": 1
    },
    "no_propagate": [
      "id",
      "protocol"
    ]
  },
  "isis": {
    "area": "49.0001",
    "type": "level-2",
    "instance": "Gandalf",
    "transform_after": [
      "vlan",
      "vrf"
    ],
    "config_after": [
      "vlan",
      "dhcp",
      "routing"
    ],
    "attributes": {
      "global": {
        "af": {
          "_list_to_dict": true,
          "_alt_types": [
            "NoneType"
          ],
          "ipv4": "bool",
          "ipv6": "bool"
        },
        "area": "net",
        "type": {
          "type": "str",
          "valid_values": [
            "level-1",
            "level-2",
            "level-1-2"
          ]
        },
        "bfd": {
          "ipv4": "bool",
          "ipv6": "bool",
          "_alt_types": [
            "bool"
          ]
        },
        "instance": "str"
      },
      "node": {
        "af": null,
        "area": null,
        "bfd": null,
        "import": "_r_import",
        "instance": null,
        "net": "net",
        "type": null
      },
      "vrf": {
        "active": "bool",
        "af": {
          "copy": "global"
        }
      },
      "link": {
        "metric": {
          "type": "int",
          "min_value": 1,
          "max_value": 16777215
        },
        "cost": {
          "type": "int",
          "min_value": 1,
          "max_value": 16777215
        },
        "type": {
          "type": "str",
          "valid_values": [
            "level-1",
            "level-2",
            "level-1-2"
          ]
        },
        "bfd": {
          "ipv4": "bool",
          "ipv6": "bool",
          "_alt_types": [
            "bool"
          ]
        },
        "network_type": {
          "type": "str",
          "valid_values": [
            "point-to-point"
          ],
          "_alt_types": [
            "bool"
          ]
        },
        "passive": "bool"
      },
      "loopback": {
        "type": {
          "copy": "link"
        },
        "metric": {
          "copy": "link"
        },
        "cost": {
          "copy": "link"
        }
      }
    },
    "features": {
      "unnumbered": {
        "ipv4": "IPv4 unnumbered interfaces",
        "ipv6": "IPv6 unnumbered interfaces",
        "network": "multi-access unnumbered links"
      },
      "import": "Route redistribution",
      "circuit_type": "Circuit type"
    },
    "warnings": {
      "inactive": true
    }
  },
  "lag": {
    "no_propagate": [
      "start_lag_id"
    ],
    "start_lag_id": 1,
    "lacp": "fast",
    "lacp_mode": "active",
    "attributes": {
      "global": {
        "lacp": "str",
        "lacp_mode": "str"
      },
      "node": {
        "lacp": "str",
        "lacp_mode": "str"
      },
      "link": {
        "members": "list",
        "ifindex": "int",
        "lacp": "str",
        "lacp_mode": "str"
      }
    }
  },
  "mpls": {
    "transform_after": [
      "ospf",
      "isis",
      "bgp"
    ],
    "config_after": [
      "ospf",
      "isis",
      "bgp"
    ],
    "attributes": {
      "global": {
        "ldp": "bool"
      },
      "node": {
        "ldp": "bool"
      },
      "interface": {
        "ldp": "bool"
      }
    }
  },
  "ospf": {
    "area": "0.0.0.0",
    "transform_after": [
      "vlan",
      "vrf"
    ],
    "config_after": [
      "vlan",
      "dhcp",
      "routing"
    ],
    "attributes": {
      "global": {
        "af": {
          "_list_to_dict": true,
          "_alt_types": [
            "NoneType"
          ],
          "ipv4": "bool",
          "ipv6": "bool"
        },
        "area": {
          "type": "ipv4",
          "use": "id"
        },
        "bfd": {
          "ipv4": "bool",
          "ipv6": "bool",
          "strict": "bool",
          "strict_delay": {
            "type": "int",
            "min_value": 0,
            "max_value": 600
          },
          "_alt_types": [
            "bool"
          ]
        },
        "passive": "bool",
        "password": "str",
        "process": {
          "type": "int",
          "min_value": 1
        },
        "reference_bandwidth": {
          "type": "int",
          "min_value": 1
        },
        "timers": {
          "hello": {
            "type": "int",
            "min_value": 1,
            "max_value": 8192
          },
          "dead": {
            "type": "int",
            "min_value": 3,
            "max_value": 8192
          }
        }
      },
      "node": {
        "af": null,
        "area": null,
        "bfd": null,
        "default": {
          "_alt_types": [
            "bool"
          ],
          "type": "dict",
          "_keys": {
            "always": "bool",
            "policy": "id",
            "cost": "int",
            "type": {
              "type": "str",
              "valid_values": [
                "e1",
                "e2"
              ]
            }
          }
        },
        "digest": {
          "type": "dict"
        },
        "gr": {
          "_remove_when_false": true,
          "_value_to_dict": {
            "restart": "{value}"
          },
          "restart": {
            "type": "dict",
            "_keys": {
              "grace_period": {
                "type": "int",
                "min_value": 1,
                "max_value": 1800
              }
            },
            "true_value": {},
            "_remove_when_false": true
          },
          "helper": {
            "type": "dict",
            "_keys": {
              "grace_period": {
                "type": "int",
                "min_value": 10,
                "max_value": 1800
              }
            },
            "true_value": {},
            "_remove_when_false": true
          }
        },
        "import": "_r_import",
        "passive": null,
        "password": {
          "copy": "global"
        },
        "priority": {
          "type": "int",
          "min_value": 0,
          "max_value": 255
        },
        "process": null,
        "reference_bandwidth": null,
        "router_id": {
          "type": "ipv4",
          "use": "id"
        },
        "timers": {
          "copy": "global"
        }
      },
      "node_copy": [
        "area",
        "passive",
        "digest",
        "password",
        "priority",
        "timers"
      ],
      "vrf_aware": [
        "area"
      ],
      "vrf_copy": [
        "area",
        "router_id",
        "reference_bandwidth",
        "gr"
      ],
      "vrf": {
        "active": "bool",
        "af": {
          "copy": "global"
        },
        "area": {
          "copy": "global"
        },
        "import": "_r_import",
        "default": {
          "copy": "node"
        },
        "digest": {
          "copy": "node"
        },
        "gr": {
          "copy": "node"
        },
        "passive": "bool",
        "password": {
          "copy": "global"
        },
        "router_id": {
          "copy": "node"
        },
        "timers": {
          "copy": "global"
        }
      },
      "link": {
        "area": {
          "copy": "global"
        },
        "bfd": "bool",
        "cost": {
          "type": "int",
          "min_value": 1,
          "max_value": 65534
        },
        "digest": {
          "copy": "node"
        },
        "network_type": {
          "type": "str",
          "valid_values": [
            "point-to-point",
            "point-to-multipoint",
            "broadcast",
            "non-broadcast"
          ]
        },
        "passive": "bool",
        "password": {
          "copy": "global"
        },
        "timers": {
          "copy": "global"
        }
      },
      "intf_to_neighbor": false,
      "intf_optional": [
        "timers",
        "priority",
        "password",
        "digest"
      ],
      "interface": {
        "priority": {
          "copy": "node"
        }
      },
      "loopback": {
        "area": {
          "copy": "global"
        },
        "cost": {
          "copy": "link"
        }
      }
    },
    "features": {
      "default": "Originate external default route",
      "digest": "MD5 authentication",
      "gr": "OSPF graceful restart (restart and helper)",
      "import": "Import routes from other routing protocols",
      "password": "Cleartext authentication",
      "priority": "Router priority",
      "strict_bfd": "Supports strict BFD mode (RFC 9355)",
      "timers": "Supports OSPF interface timers",
      "unnumbered": "Can run OSPFv2 over unnumbered IPv4 interfaces"
    },
    "warnings": {
      "inactive": true,
      "gr_helper_grace": true
    }
  },
  "sr": {
    "transform_after": [
      "vlan",
      "ospf",
      "isis"
    ],
    "config_after": [
      "vlan",
      "ospf",
      "isis"
    ],
    "no_propagate": [
      "node_sid_offset"
    ],
    "node_sid_offset": {
      "ipv4": 0,
      "ipv6": 100
    },
    "protocol": [
      "isis"
    ],
    "attributes": {
      "global": {
        "af": {
          "ipv4": "bool",
          "ipv6": "bool"
        },
        "node_sid_offset": {
          "ipv4": "int",
          "ipv6": "int"
        },
        "protocol": "list"
      },
      "node": {
        "af": {
          "ipv4": "bool",
          "ipv6": "bool"
        },
        "srgb": {
          "start": "int",
          "size": "int",
          "dyn_start": "int",
          "dyn_size": "int"
        },
        "node_sid": {
          "ipv4": "int",
          "ipv6": "int"
        },
        "protocol": "list"
      }
    },
    "features": {
      "af": "Address family support",
      "protocol": "Supported routing protocols"
    }
  },
  "vlan": {
    "config_after": [
      "lag"
    ],
    "transform_after": [
      "lag"
    ],
    "no_propagate": [
      "start_vlan_id",
      "mode"
    ],
    "start_vlan_id": 1000,
    "mode": "irb",
    "attributes": {
      "global": {
        "mode": {
          "type": "str",
          "valid_values": [
            "bridge",
            "irb",
            "route"
          ]
        }
      },
      "node": {
        "mode": null
      },
      "link": {
        "access": "id",
        "native": "id",
        "mode": {
          "type": "str",
          "valid_values": [
            "route"
          ]
        },
        "trunk": null
      },
      "vlan_no_propagate": {
        "id": null,
        "vni": null,
        "mode": null,
        "prefix": null,
        "evpn": null,
        "stp": null,
        "lag": null
      },
      "copy_vlan_to_intf": {
        "ipv4": null,
        "ipv6": null,
        "gateway": null
      },
      "phy_ifattr": {
        "bridge": null,
        "ifindex": null,
        "parentindex": null,
        "ifname": null,
        "linkindex": null,
        "type": null,
        "vlan": null,
        "mtu": null,
        "bandwidth": null,
        "_selfloop_ifindex": null,
        "stp": null,
        "virtual_interface": null,
        "lag": null,
        "evpn": null
      },
      "keep_subif": {
        "vlan": null,
        "ifindex": null,
        "ifname": null,
        "type": null,
        "virtual_interface": null
      }
    },
    "features": {
      "model": "Conceptual device configuration model",
      "mixed_trunk": "Supports trunk interfaces with mixed routed/bridged VLANs",
      "native_routed": "Supports native layer-3 interface on a trunk port"
    },
    "_top": {
      "attributes": {
        "vlan": {
          "_description": "Global VLAN definition",
          "id": {
            "type": "int",
            "min_value": 1,
            "max_value": 4095
          },
          "vni": {
            "type": "int",
            "min_value": 1,
            "max_value": 16777215
          },
          "mode": {
            "type": "str",
            "valid_values": [
              "bridge",
              "irb",
              "route"
            ]
          },
          "links": "list",
          "prefix": null,
          "_namespace": [
            "link"
          ]
        },
        "node_vlan": {
          "_description": "Node VLAN definition",
          "id": {
            "type": "int",
            "min_value": 1,
            "max_value": 4095
          },
          "vni": {
            "type": "int",
            "min_value": 1,
            "max_value": 16777215
          },
          "mode": {
            "type": "str",
            "valid_values": [
              "bridge",
              "irb",
              "route"
            ]
          },
          "links": "list",
          "prefix": null,
          "_namespace": [
            "link",
            "interface"
          ]
        },
        "global": {
          "vlans": {
            "type": "dict",
            "_subtype": "vlan",
            "_keytype": "id",
            "_requires": [
              "vlan"
            ]
          }
        },
        "node": {
          "vlans": {
            "type": "dict",
            "_subtype": "node_vlan",
            "_keytype": "id",
            "_requires": [
              "vlan"
            ]
          }
        }
      }
    },
    "warnings": {
      "mixed_fwd_check": true
    }
  },
  "vrf": {
    "config_after": [
      "vlan",
      "ospf",
      "isis",
      "bgp",
      "mpls"
    ],
    "transform_after": [
      "vlan",
      "bgp"
    ],
    "as": 65000,
    "attributes": {
      "global": {
        "as": "asn",
        "loopback": "bool"
      },
      "node": {
        "as": null,
        "loopback": "bool"
      },
      "link": "id",
      "interface": "id",
      "reserved": [
        "default",
        "system",
        "global",
        "base",
        "mgmt",
        "management",
        "mgmt_junos"
      ]
    },
    "warnings": {
      "inactive": true
    },
    "_top": {
      "attributes": {
        "vrf": {
          "_description": "Global or node-level VRF definition",
          "rd": "rd",
          "import": "list",
          "export": "list",
          "id": {
            "type": "int",
            "min_value": 1
          },
          "links": "list",
          "loopback": {
            "type": "dict",
            "_alt_types": [
              "bool",
              "prefix_str",
              "NoneType"
            ]
          },
          "_namespace": [
            "link"
          ]
        },
        "global": {
          "vrfs": {
            "type": "dict",
            "_subtype": "vrf",
            "_keytype": "id",
            "_requires": [
              "vrf"
            ]
          }
        },
        "node": {
          "vrfs": {
            "type": "dict",
            "_subtype": "vrf",
            "_keytype": "id",
            "_requires": [
              "vrf"
            ]
          }
        }
      }
    },
    "features": {
      "ospfv2": "VRF-aware OSPFv2",
      "ospfv3": "VRF-aware OSPFv3",
      "ripv2": "VRF-aware RIPv2",
      "ripng": "VRF-aware RIPng",
      "isis": "VRF-aware IS-IS",
      "bgp": "BGP neighbors in VRF BGP instances"
    }
  },
  "vxlan": {
    "requires": [
      "vlan"
    ],
    "config_after": [
      "vrf",
      "bgp"
    ],
    "transform_after": [
      "vlan",
      "vrf"
    ],
    "domain": "global",
    "flooding": "static",
    "start_vni": 100000,
    "attributes": {
      "global": {
        "domain": "id",
        "flooding": {
          "type": "str",
          "valid_values": [
            "static",
            "evpn"
          ]
        },
        "vlans": "list",
        "use_v6_vtep": "bool"
      },
      "node": {
        "domain": null,
        "flooding": null,
        "vlans": null
      },
      "link": {
        "vtep": "bool"
      }
    },
    "no_propagate": [
      "use_v6_vtep",
      "start_vni"
    ],
    "use_v6_vtep": false,
    "features": {
      "vtep6": "VXLAN over IPv6"
    }
  }
};

